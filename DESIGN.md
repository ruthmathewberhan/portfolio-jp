---
name: Ethio-Catholic TVET Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#42474c'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#73787c'
  outline-variant: '#c3c7cc'
  surface-tint: '#486173'
  primary: '#1b3445'
  on-primary: '#ffffff'
  primary-container: '#324b5c'
  on-primary-container: '#a0bacf'
  inverse-primary: '#b0cade'
  secondary: '#a73835'
  on-secondary: '#ffffff'
  secondary-container: '#fd7771'
  on-secondary-container: '#710e13'
  tertiary: '#452c11'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e4225'
  on-tertiary-container: '#d6af8a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cbe6fb'
  primary-fixed-dim: '#b0cade'
  on-primary-fixed: '#011e2d'
  on-primary-fixed-variant: '#314a5b'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#872020'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#e8bf99'
  on-tertiary-fixed: '#2c1701'
  on-tertiary-fixed-variant: '#5d4124'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-xl:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.25'
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: auto
---

## Brand & Style
The design system is anchored in the dual identity of a Catholic TVET Institute: the steadfast reliability of a faith-based institution and the forward-looking precision of technical education. The brand personality is **authoritative, resourceful, and dignified**. 

The chosen style is **Corporate / Modern**. It prioritizes clarity and structured information architecture to facilitate learning and administrative ease. By combining traditional academic layouts with modern digital affordances—such as subtle gradients and crisp iconography—the design system evokes a sense of innovation rooted in values. The aesthetic should feel "technical" through its use of precise alignment and "trustworthy" through its restrained color application.

## Colors
This design system utilizes a palette derived from the institute's heritage. **Navy Blue** acts as the primary anchor, used for headers, primary navigation, and core branding elements to signify stability. **Deep Red** is used strategically as an accent color for calls to action, highlights, and status indicators that require attention without being alarming.

The neutral palette transitions from Slate Grays to Cool Whites, ensuring high legibility and a "clean" environment. In dark mode, the navy influence is retained within the surface colors to prevent the interface from feeling "pure black," maintaining the institutional character.

## Typography
**Public Sans** is the sole typeface for this design system. It was chosen for its institutional clarity and its roots in government/official design standards, which lends immediate credibility to the TVET context.

Headlines use a bold weight to establish a clear hierarchy, especially for course titles and department headings. Body text is set with generous line height to ensure accessibility for students and staff. All labels and buttons utilize a semi-bold weight and slight tracking to differentiate them from informative prose.

## Layout & Spacing
The design system employs a **Fixed Grid** approach for desktop views, centering content within a 1280px max-width container to maintain an organized, "ledger-like" appearance. A standard 12-column grid is used with 24px gutters.

Spacing follows an 8px base unit. Component internal padding should be generous (e.g., 24px for card containers) to prevent the technical information from feeling overwhelming. Use large vertical spacing (XL units) between distinct sections on landing pages to create a "breathable" and modern educational experience.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Ambient Shadows**. This design system avoids heavy shadows in favor of subtle, high-blur offsets that lift elements off the background without creating visual clutter.

1.  **Low Elevation (Resting Cards):** A soft 4px blur shadow with 5% opacity using a navy-tinted neutral.
2.  **Medium Elevation (Buttons/Hover):** A 12px blur shadow with 10% opacity to indicate interactivity.
3.  **High Elevation (Navigation/Modals):** A 24px blur shadow with a slight vertical offset (Y: 8px) to signify priority.

In Dark Mode, elevation is primarily indicated by lightening the surface color (Step 1: `#1E293B`, Step 2: `#334155`) rather than increasing shadow density.

## Shapes
The shape language is **Soft**. A corner radius of 0.25rem (4px) is the standard for inputs and smaller buttons, providing a disciplined, technical feel. Larger elements like cards and main container sections utilize `rounded-lg` (0.5rem) to soften the overall institutional appearance and make the platform feel approachable to students.

## Components

### Buttons
Primary buttons use the Navy Blue background with white text. Secondary buttons use an outline of the Navy or Red with a subtle transparent fill on hover. All buttons feature a 1px border and a slight transition on the shadow depth to provide tactile feedback.

### Cards
Cards are the primary vehicle for course listings and news. They should have a 1px border (`border-light` or `border-dark`) and use the resting shadow. Content inside cards should be padded at 24px. Header sections within cards may use a very light Navy tint (`bg-secondary`) to separate titles from descriptions.

### Navigation
The main navigation should be a top bar with a clean, white background (light mode) or deep navy (dark mode). Navigation links use the Navy Blue for the "Active" state, paired with a Deep Red bottom border (2px) to provide a clear indicator of the user's current location.

### Input Fields
Inputs are rectangular with the "Soft" corner radius. Labels are always positioned above the field in `label-sm` weight. The focus state uses a 2px Navy Blue stroke to emphasize the institute's primary color.

### Progress Indicators
As a TVET institute, student progress is vital. Progress bars should use a Deep Red fill against a light gray track to denote energy and movement through the curriculum.