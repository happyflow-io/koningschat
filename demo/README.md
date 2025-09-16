# Koningsspelen Chatbot - Fullscreen Overlay Demo

## 🎯 Updated Requirements (v2.0)

### New UX Approach: Fullscreen Overlay

**Previous:** Small iframe widget in corner  
**New:** Fullscreen chat overlay with toggle functionality

### User Experience Flow

1. **First Visit:** User sees fullscreen chat overlay
2. **Toggle to Website:** Button rechtsonder → normale website
3. **Toggle to Chat:** Button rechtsonder → terug naar chat overlay
4. **State Preservation:** Website blijft geladen op achtergrond

## 🚀 Technical Implementation

### Components Needed

1. **FullscreenChatOverlay.vue** - Main overlay component
2. **ToggleButton.vue** - Switch between chat/website
3. **OverlayManager.js** - State management
4. **Integration script** - For external websites

### Integration Method

```html
<!-- Single script tag integration -->
<script src="https://koningsspelen-chat.nl/overlay-widget.js"></script>
```

**What it does:**
- Detects first visit → shows chat overlay
- Adds toggle button to website
- Manages overlay state
- Preserves website navigation

## 💡 Advantages of New Approach

**User Experience:**
- ✅ Chat is primary focus (first impression)
- ✅ Smooth transitions between chat/website
- ✅ No iframe limitations
- ✅ Better mobile experience

**Technical:**
- ✅ Full control over styling
- ✅ Better performance (no iframe)
- ✅ Easier responsive design
- ✅ Direct API communication

**Business:**
- ✅ Higher engagement (chat first)
- ✅ Professional appearance
- ✅ Better conversion rates
