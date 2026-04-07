

## M-Charging — Metro SDQ Mobile Web App

A mobile-first web application for Metro Santo Domingo's transit payment system, built with React and styled to look like a native mobile app. All content in Spanish (Dominican Republic), using mock data.

### Screens to Build (9 total)

1. **Splash Screen** — Full navy (#003366) background, animated "M" logo, loading spinner, auto-navigates to Login after 2.5s

2. **Login** — Navy top section with logo, white bottom card with email/password inputs, biometric option button, link to Register

3. **Register** — Same header style, form with nombre, apellido, email, cédula (formatted), password with strength indicator, confirm password, terms checkbox

4. **Dashboard (Home)** — Greeting header, floating balance card (#1558A0) showing RD$ 350.00 with NFC card details, 2×2 quick action grid, last 3 transactions list, bottom navigation bar

5. **Recharge** — Balance preview (current → new), 3-column amount selector grid (RD$50–RD$1,000 + custom), payment method selection (Visa/Apple Pay/Google Pay), confirm button fixed at bottom

6. **Transaction History** — Filter pills (Todos/Recargas/Pasajes/Este mes), search bar, transactions grouped by date with colored icons and amounts in green/red

7. **Saved Cards (Tarjetas)** — Visual credit card component with gradient, set default/delete actions, dashed "add new card" area

8. **Auto-Recharge Settings** — Toggle switch, threshold slider (RD$20–200), amount pills, payment method, info card, save button

9. **Link NFC Card** — Animated NFC pulse illustration, 3-step instructions, manual UID input, success state with green checkmark

### Design System
- Custom color palette applied via CSS variables (navy, blue, success green, error red, alert orange, gold NFC)
- Inter/system font, flat design, no gradients except card visuals
- Border radius: 16px cards, 12px buttons, 8px inputs
- Bottom nav with active dot indicator on all screens except Splash/Login/Register
- 44px top safe area, 34px bottom safe area padding
- All monetary values formatted as RD$ with Dominican peso formatting

### Navigation
- React Router with `/splash`, `/login`, `/register`, `/dashboard`, `/recharge`, `/history`, `/cards`, `/auto-recharge`, `/link-nfc`
- Bottom nav persists on dashboard and inner screens (Inicio, Recargar, Tarjetas, Historial)
- Splash auto-redirects → Login → Dashboard flow

### Mock Data
- Demo user: "Daniel De La Rosa", balance RD$ 350.00
- Sample transactions (recargas, pasajes Línea 1/2, Teleférico)
- Mock saved card: Visa ••• 4242, Banco Popular

