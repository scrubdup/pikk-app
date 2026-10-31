# t209u bottom tabbar reshape

User: reshape bottom icons; add Post; main option Go Live → goes right to go-live.

## Expected
- Tabs L→R: Home · Post · Go Live (raised center) · Music · Profile
- Go Live href `#/live?go=1` scrolls to `#live-go` Start stream card
- Post → `#/posts`
- Videos no longer in tabbar (drawer still has Videos)

## Files
- src/data.js TABBAR
- src/main.js buildTabbar + deep-link
- src/pages/live.js id=live-go
- src/styles.css .tabbar-reshaped / .tab-primary

## t210u add-on
- Chat → #/community (Lounge)
- Messages → #/messages with red unread count badge
- Demo seeds 2 Maya DMs when signed in if no unread
- Opening a thread marks it read (badge drops)

## t211u — Music + Videos restored
User asked where Music/Videos went. New order:
Home · Music · Videos · Go Live (center) · Post · Messages (unread badge) · Profile
Chat/Lounge removed from tabbar → hamburger only.

## t212u — all tabs fair size
All 8 on bottom: Home Music Videos Post Go Live Chat Messages Profile
Horizontal scroll, min-width 64px, 11px labels, 22px icons (Go Live larger).

