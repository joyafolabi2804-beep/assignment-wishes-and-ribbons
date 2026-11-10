# PRD success check — Wishes & Ribbons

Reference: the user-supplied PRD, with its textual requirements retained in [PRD-reference.md](PRD-reference.md).

The prototype now leads with priced gift sets. Each draft contains one gift set only. A new choice replaces the previous one. Only curated catalogue gift sets can be selected. The build-your-own feature is disabled for now.

## Essential features and information

- Catalogue: Self-care gift set **€28.00** and Tea & spices gift set **€22.30** (sample price). A little Christmas at Home **€36.65** has now been added with the supplied photo and contents: Christmas tree ornament, napkin and scented candle. All three sets have a clear photo, description and contents.
- Selection/cart: choose one set, see quantity 1, change or remove the selection, or continue browsing. The order summary is blocked when nothing is selected.
- Personal message: optional, limited to 280 characters, editable on the page and in the cart. Edits are reflected in the summary. An empty message is shown as “No personal message added.”
- Summary: selected gift set, contents, EUR price and current message. It updates when the set or message changes.
- Confirmation: only the explicit **Confirm pretend order** action produces a demonstration confirmation. It includes the selected set, price, message and a `DEMO-` reference, and states that no payment was taken or real order sent.
- No customer account, payment details or delivery information is required to complete the pretend flow. Delivery/pickup controls and information sections have been removed from the current prototype. Payment integrations remain absent, as requested earlier.
- Existing brand identity, gift-set photographs, typography and warm palette are preserved. Personalised messaging is the only optional customer feature. Build-your-own, individual-item shopping, packaging choices and delivery/pickup sections are not shown or loaded.

## Success tests

“Verified (automated)” below means domain tests and a limited DOM-control smoke check against the current HTML/JS. The DOM check does not render CSS and is not a substitute for a real browser test.

| PRD criterion | Result | Evidence |
| --- | --- | --- |
| View the catalogue and select a set | Verified (automated) | All three catalogue cards render; choosing a set opens its summary with the correct name and price. |
| Cannot continue without a set | Verified (automated) | Empty cart shows a browse prompt; summary is hidden and confirm is disabled; the model also rejects confirmation. |
| Add a personal message | Verified (automated) | Typing into the cart message updates the page field, model and summary. |
| Continue without a message | Verified (automated) | A blank-message selection completes the pretend confirmation flow. |
| Summary shows correct set, price and message | Verified (automated) | All known sets, current prices and entered/blank messages are asserted. |
| Change choices before confirming | Verified (automated) | Change-set and message-edit controls update the draft without creating a confirmation. |
| Confirmation displays a clear demonstration result | Verified (automated) | Confirmation is closed before the explicit confirm click; afterward it shows the selected set, price, message, DEMO reference and no-payment/no-real-order notice. |
| Main steps work on a computer screen | **Not visually verified** | Desktop-responsive HTML/CSS and local HTTP 200 were checked. Browser access host is unavailable, and Computer Use was not approved to use Google Chrome. A real desktop browser pass is still needed. |
| Changing a gift replaces it | Verified (automated) | Selecting the second set keeps the cart count and order quantity at 1 and removes the previous selection. |
| Edits update the order summary correctly | Verified (automated) | Set/price changes and revised messages are asserted before confirmation. |
| Continue browsing without finding a suitable set | Verified (automated) | Empty-cart close/browse actions work without creating a selection or confirmation. |
| Prototype works without an account | Verified (automated/source) | The complete pretend flow runs with local draft state and no account, payment or required delivery fields. |

## Re-run

From the site checkout:

```sh
node --test tests/order.test.cjs
node tests/prd-dom-smoke.cjs
```

The DOM-control check additionally uses the system `python3` to parse the current HTML. At this revision all 10 active order tests and the DOM-control smoke check passed. JavaScript syntax, asset references and section anchors passed. The desktop visual test remains explicitly unverified for the access reasons above.

Current scope update: the user requested gift sets plus optional personalised messages only. Old custom selections are rejected on restoration and cannot be chosen by the active order model. The catalogue, cart, message and pretend confirmation flow were rechecked after removing the optional builder and delivery/pickup sections.

Christmas set verification: selecting A little Christmas at Home displays €36.65, the exact supplied photo and all three contents; a personalised Christmas wish carries through to its pretend-order confirmation.

Message-flow correction: selecting a gift now opens an optional-message editor. A dedicated Review order summary button opens a separate read-only summary with an Edit message / Add a message action. Editing returns to the populated editor, invalidates stale review data when text changes, and requires reviewing again before confirmation. The page message form and note preview also have direct routes to the complete order summary. Confirmation is guarded by both the UI step and a current model-level review snapshot. Updated regression checks cover edited, removed and blank messages, all entry points and no auto-confirmation.

Layout refinement: the catalogue now has a full-width white surround, and the displayed order is Self-care, A little Christmas at Home, then Tea & spices. Pale olive remains elsewhere on the page.
