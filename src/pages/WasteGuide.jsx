import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  UploadCloud, 
  Sparkles, 
  Filter, 
  AlertCircle, 
  Leaf, 
  Recycle, 
  Info,
  Camera,
  X,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  ImageIcon
} from 'lucide-react';
import { WASTE_ITEMS, WASTE_CATEGORIES } from '../data/wasteItems';
import WasteResult from '../components/WasteResult';
import { 
  getWasteCounts, 
  recordWasteIdentification, 
  getCategoryDisplayName 
} from '../utils/storage';
import { identifyWasteImage } from '../services/ecoAI';

export default function WasteGuide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('ALL');
  const [activeResultItem, setActiveResultItem] = useState(null);
  const [isRecorded, setIsRecorded] = useState(false);
  const [recordedCategoryName, setRecordedCategoryName] = useState('');
  
  // Real-time waste summary counts
  const [wasteCounts, setWasteCounts] = useState(getWasteCounts());

  // Image Upload state
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Track the last identified signature to prevent duplicate counts
  const lastIdentifiedSignature = useRef('');

  const quickSearchSuggestions = [
    'banana peel',
    'plastic bottle',
    'cardboard',
    'glass bottle',
    'aluminum can',
    'old mobile phone',
    'battery',
    'old clothes',
    'charger',
    'laptop',
    'chips packet',
    'cfl bulb'
  ];

  // Sync waste counts on mount and upon any update
  useEffect(() => {
    const handleUpdate = () => {
      setWasteCounts(getWasteCounts());
    };
    window.addEventListener('ecowise_waste_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ecowise_waste_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Filter items based on query and category
  const filteredItems = useMemo(() => {
    let items = WASTE_ITEMS;

    if (selectedCategoryKey !== 'ALL') {
      items = items.filter(item => item.categoryKey === selectedCategoryKey);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(q);
        const categoryMatch = item.category.toLowerCase().includes(q);
        const aliasMatch = item.aliases?.some(a => a.toLowerCase().includes(q));
        return nameMatch || categoryMatch || aliasMatch;
      });
    }

    return items;
  }, [searchQuery, selectedCategoryKey]);

  // Perform search identification and record count once
  const handleIdentifySearchItem = (itemToIdentify) => {
    if (!itemToIdentify) return;
    
    setActiveResultItem(itemToIdentify);

    // Prevent duplicate counting if the user clicks or re-selects the exact same item
    const signature = `item-${itemToIdentify.id}`;
    if (lastIdentifiedSignature.current !== signature) {
      lastIdentifiedSignature.current = signature;
      const res = recordWasteIdentification(itemToIdentify, 'Search');
      if (res) {
        setIsRecorded(true);
        setRecordedCategoryName(res.categoryName);
        setWasteCounts(res.updatedCounts);
      }
    } else {
      setIsRecorded(true);
      setRecordedCategoryName(itemToIdentify.category);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    // Find best match in wasteItems
    const match = WASTE_ITEMS.find(item => 
      item.name.toLowerCase() === q ||
      item.aliases?.some(a => a.toLowerCase() === q) ||
      item.name.toLowerCase().includes(q) ||
      item.aliases?.some(a => a.toLowerCase().includes(q))
    );

    if (match) {
      handleIdentifySearchItem(match);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchQuery(suggestion);
    const found = WASTE_ITEMS.find(item => 
      item.name.toLowerCase().includes(suggestion.toLowerCase()) || 
      item.aliases?.some(a => a.toLowerCase().includes(suggestion.toLowerCase()))
    );
    if (found) {
      handleIdentifySearchItem(found);
    }
  };

  // Image file handler
  const processImageFile = (file) => {
    setImageError(null);
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setImageError('Image file is too large. Please upload an image under 8MB.');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    processImageFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    processImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageError(null);
    setIsAnalyzingImage(false);
  };

  // Start waste identification from image
  const handleIdentifyImage = async () => {
    if (!imagePreview || isAnalyzingImage) return;

    setIsAnalyzingImage(true);
    setImageError(null);

    try {
      const mimeType = imageFile?.type || 'image/jpeg';
      const result = await identifyWasteImage(imagePreview, mimeType);

      if (result && result.success && result.item) {
        const recognizedItem = {
          id: `ai-img-${Date.now()}`,
          name: result.item,
          category: result.category,
          categoryKey: result.categoryKey,
          recommendedAction: result.recommendedAction,
          explanation: result.explanation,
          ecoTip: result.ecoTip
        };

        setActiveResultItem(recognizedItem);

        // Record identification count
        const recResult = recordWasteIdentification(recognizedItem, 'Image');
        if (recResult) {
          setIsRecorded(true);
          setRecordedCategoryName(recResult.categoryName);
          setWasteCounts(recResult.updatedCounts);
          lastIdentifiedSignature.current = `img-${recognizedItem.name}`;
        }
      } else {
        setImageError(result?.error || 'Unable to confidently identify this item. Try a clearer image or use the search option.');
      }
    } catch (err) {
      console.error('Error in handleIdentifyImage:', err);
      setImageError('Unable to confidently identify this item. Try a clearer image or use the search option.');
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  return (
    <div className="waste-guide-page">
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 2.2rem auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#DCFCE7',
          color: '#166534',
          padding: '0.35rem 0.85rem',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '0.85rem',
          border: '1px solid #86EFAC'
        }}>
          <Recycle size={16} />
          <span>Core Feature • Smart Waste Identification</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', color: '#14532D', marginBottom: '0.5rem', lineHeight: '1.2' }}>
          What are you throwing away?
        </h1>
        <p style={{ fontSize: '1.05rem', color: '#64748B', lineHeight: '1.5' }}>
          Identify the right way to dispose of everyday items. Keep recyclables clean, compost organic waste, and protect soil from hazardous toxins.
        </p>
      </div>

      {/* TOP SECTION: COMBINED SEARCH BAR & ACTIVE IMAGE RECOGNITION */}
      <div className="waste-guide-top-grid" style={{
        maxWidth: '1040px',
        margin: '0 auto 2.5rem auto',
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.95fr',
        gap: '1.5rem',
        alignItems: 'stretch'
      }}>
        {/* Left Card: Search Bar */}
        <div className="eco-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1.5px solid #BBF7D0',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Search size={20} color="#16A34A" />
              <h3 style={{ fontSize: '1.15rem', color: '#0F172A' }}>Text Waste Search</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.1rem' }}>
              Type any household item to instantly discover its segregation category and disposal steps.
            </p>

            <form onSubmit={handleSearchSubmit}>
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <input
                  type="text"
                  className="form-input"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    const q = e.target.value.toLowerCase().trim();
                    if (q) {
                      const match = WASTE_ITEMS.find(item => 
                        item.name.toLowerCase().includes(q) || 
                        item.aliases?.some(a => a.toLowerCase().includes(q))
                      );
                      if (match) {
                        handleIdentifySearchItem(match);
                      }
                    }
                  }}
                  placeholder="e.g. banana peel, plastic bottle, battery, chips..."
                  style={{
                    paddingLeft: '1.1rem',
                    paddingRight: '6.5rem',
                    paddingTop: '0.9rem',
                    paddingBottom: '0.9rem',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #86EFAC',
                    backgroundColor: '#F8FAFC'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '6px',
                    bottom: '6px',
                    padding: '0 1rem',
                    fontSize: '0.88rem',
                    borderRadius: '8px'
                  }}
                >
                  Identify
                </button>
              </div>
            </form>

            {/* Popular search chips */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginBottom: '0.45rem' }}>
                Quick suggestions:
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {quickSearchSuggestions.slice(0, 8).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    style={{
                      backgroundColor: searchQuery.toLowerCase() === suggestion ? '#16A34A' : '#F1F5F9',
                      color: searchQuery.toLowerCase() === suggestion ? '#FFFFFF' : '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: ACTIVE IMAGE RECOGNITION (Upload / Drag & Drop) */}
        <div className="eco-card" style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: isDragOver ? '2px dashed #16A34A' : '1.5px solid #BAE6FD',
          backgroundColor: isDragOver ? '#F0FDF4' : '#FFFFFF',
          borderRadius: '20px',
          transition: 'all 0.2s ease'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Camera size={20} color="#0EA5E9" />
                <h3 style={{ fontSize: '1.15rem', color: '#0F172A' }}>AI Image Recognition</h3>
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                backgroundColor: '#E0F2FE',
                color: '#0284C7',
                padding: '0.15rem 0.55rem',
                borderRadius: '999px'
              }}>
                Gemini Vision
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
              Upload Waste Image or Drag & Drop below to identify materials with AI.
            </p>

            {/* Upload / Preview Box */}
            {!imagePreview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: '2px dashed #CBD5E1',
                  borderRadius: '14px',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  backgroundColor: '#F8FAFC',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                  title="Upload waste image"
                />
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#E0F2FE',
                  color: '#0EA5E9',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.6rem'
                }}>
                  <UploadCloud size={24} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0F172A', marginBottom: '0.2rem' }}>
                  Upload Waste Image
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  or Drag & Drop Image here (JPEG, PNG)
                </div>
              </div>
            ) : (
              /* Image Preview Box */
              <div style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1.5px solid #CBD5E1',
                backgroundColor: '#0F172A'
              }}>
                <img
                  src={imagePreview}
                  alt="Waste to identify"
                  style={{
                    width: '100%',
                    height: '170px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <button
                  onClick={handleRemoveImage}
                  disabled={isAnalyzingImage}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '50%',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Remove or Change Image"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Error Message */}
            {imageError && (
              <div style={{
                marginTop: '0.75rem',
                backgroundColor: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '10px',
                padding: '0.6rem 0.85rem',
                fontSize: '0.82rem',
                color: '#92400E',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.45rem'
              }}>
                <AlertCircle size={16} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{imageError}</span>
              </div>
            )}
          </div>

          {/* Action Row for Image Identification */}
          {imagePreview && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <button
                onClick={handleIdentifyImage}
                disabled={isAnalyzingImage}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '0.92rem',
                  backgroundColor: '#0EA5E9'
                }}
              >
                {isAnalyzingImage ? (
                  <>
                    <RefreshCw size={16} className="spinning" />
                    <span>Analyzing Image...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Identify Waste</span>
                  </>
                )}
              </button>
              <button
                onClick={handleRemoveImage}
                disabled={isAnalyzingImage}
                className="btn btn-outline"
                style={{ padding: '0.75rem 0.9rem', fontSize: '0.85rem' }}
              >
                Change
              </button>
            </div>
          )}
        </div>
      </div>

      {/* COMPACT CATEGORY SUMMARY: YOUR WASTE SUMMARY */}
      <section style={{ maxWidth: '1040px', margin: '0 auto 2.5rem auto' }}>
        <div className="eco-card" style={{
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: '20px',
          padding: '1.25rem 1.75rem',
          boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1rem',
            borderBottom: '1px solid #F1F5F9',
            paddingBottom: '0.65rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Recycle size={20} color="#16A34A" />
              <h3 style={{ fontSize: '1.1rem', color: '#0F172A', letterSpacing: '-0.01em' }}>
                YOUR WASTE SUMMARY
              </h3>
            </div>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              backgroundColor: '#DCFCE7',
              color: '#166534',
              padding: '0.3rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid #86EFAC'
            }}>
              Total Identified: {wasteCounts.total} items
            </div>
          </div>

          {/* 6 Category Count Badges */}
          <div className="waste-summary-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.75rem'
          }}>
            {/* Wet Waste */}
            <div style={{
              backgroundColor: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '12px',
              padding: '0.75rem 0.65rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', marginBottom: '0.2rem' }}>
                🟢 Wet Waste
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#16A34A', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.wetWaste}
              </div>
            </div>

            {/* Dry Waste */}
            <div style={{
              backgroundColor: '#F0F9FF',
              border: '1px solid #BAE6FD',
              borderRadius: '12px',
              padding: '0.75rem 0.65rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369A1', marginBottom: '0.2rem' }}>
                🔵 Dry Waste
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0EA5E9', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.dryWaste}
              </div>
            </div>

            {/* Recyclable */}
            <div style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: '12px',
              padding: '0.75rem 0.65rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#065F46', marginBottom: '0.2rem' }}>
                ♻️ Recyclable
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.recyclable}
              </div>
            </div>

            {/* E-Waste */}
            <div style={{
              backgroundColor: '#FAF5FF',
              border: '1px solid #DDD6FE',
              borderRadius: '12px',
              padding: '0.75rem 0.65rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6D28D9', marginBottom: '0.2rem' }}>
                🟣 E-Waste
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#7C3AED', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.eWaste}
              </div>
            </div>

            {/* Donate / Reuse */}
            <div style={{
              backgroundColor: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '12px',
              padding: '0.75rem 0.65rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400E', marginBottom: '0.2rem' }}>
                🟡 Donate/Reuse
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.donateReuse}
              </div>
            </div>

            {/* Hazardous Disposal */}
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '12px',
              padding: '0.75rem 0.65rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991B1B', marginBottom: '0.2rem' }}>
                🔴 Hazardous
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-heading)' }}>
                {wasteCounts.hazardous}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER PILLS */}
      <div style={{ maxWidth: '1040px', margin: '0 auto 1.5rem auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem'
        }}>
          <button
            onClick={() => setSelectedCategoryKey('ALL')}
            style={{
              backgroundColor: selectedCategoryKey === 'ALL' ? '#16A34A' : '#FFFFFF',
              color: selectedCategoryKey === 'ALL' ? '#FFFFFF' : '#475569',
              border: '1.5px solid #CBD5E1',
              padding: '0.45rem 1rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            All Database Items ({WASTE_ITEMS.length})
          </button>

          {Object.entries(WASTE_CATEGORIES).map(([key, cat]) => {
            const isSelected = selectedCategoryKey === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategoryKey(key)}
                style={{
                  backgroundColor: isSelected ? cat.color : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : cat.color,
                  border: `1.5px solid ${cat.border}`,
                  padding: '0.45rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: DIRECTORY & DETAILED RESULT CARD */}
      <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
        <div className="waste-guide-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 1.65fr', gap: '1.75rem' }}>
          {/* Left Column: Directory of items */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.85rem'
            }}>
              <h3 style={{ fontSize: '1.1rem', color: '#0F172A' }}>Waste Directory</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
                {filteredItems.length} available
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.55rem',
              maxHeight: '560px',
              overflowY: 'auto',
              paddingRight: '0.35rem'
            }}>
              {filteredItems.length === 0 ? (
                <div className="eco-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '0.5rem' }}>
                    No exact item match found for "{searchQuery}".
                  </p>
                  <p style={{ color: '#16A34A', fontSize: '0.82rem', fontWeight: 600 }}>
                    💡 Try image recognition above or ask our EcoAI assistant!
                  </p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const isSelected = activeResultItem?.id === item.id;
                  const catMeta = WASTE_CATEGORIES[item.categoryKey];
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleIdentifySearchItem(item)}
                      style={{
                        padding: '0.8rem 0.95rem',
                        borderRadius: '12px',
                        backgroundColor: isSelected ? '#F0FDF4' : '#FFFFFF',
                        border: isSelected ? '2px solid #16A34A' : '1px solid #E2E8F0',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.92rem' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: catMeta?.color || '#64748B', fontWeight: 600 }}>
                          {item.category}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '0.72rem',
                        backgroundColor: catMeta?.bg || '#E2E8F0',
                        color: catMeta?.color || '#334155',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        fontWeight: 700
                      }}>
                        {catMeta?.name}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Detailed Waste Result Card */}
          <div>
            {activeResultItem ? (
              <WasteResult
                item={activeResultItem}
                isRecorded={isRecorded}
                recordedCategoryName={recordedCategoryName}
              />
            ) : (
              <div className="eco-card" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#DCFCE7',
                  color: '#16A34A',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Recycle size={28} />
                </div>
                <h3 style={{ color: '#0F172A', fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                  Select or Upload an Item to Identify
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto', lineHeight: '1.5' }}>
                  Use the search bar, click on any item in the directory, or upload a photo to immediately classify waste and add to your segregation count.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
