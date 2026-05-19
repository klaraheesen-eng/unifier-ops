# CCTV Quoting Checklist

Use this checklist as the minimum qualification standard before drafting a CCTV quote. It should mirror the important lead and site-survey questions already present in Unity, then evolve as the team trains Klara further.

## Rule
- Do not jump straight to pricing from a vague CCTV request unless the user explicitly wants only a rough budget.
- First capture the minimum qualification answers below.
- If some answers are missing, clearly label the quote as **budgetary** and note the assumptions.

## Minimum lead questions from Unity
These are the minimum fields visible in `lead-new.asp` and should be covered early in the conversation.

1. Contact name
2. Email address
3. Telephone number
4. General area / site location
5. Building type (house, office block, warehouse, shop, storeroom, etc.)
6. Purpose of cameras
7. Approximate number of cameras needed
8. Ceiling available? (where relevant for cable routing / mounting)
9. Internet available?
10. Human detection / human-form analytics required?
11. ColorVu / full-colour night vision required?
12. General notes / client message

## Minimum CCTV quoting questions
Use these as the default clarifying questions before a proper quote.

### Site and layout
1. What is the exact site address?
2. What type of site is it? (home, office, warehouse, retail, storerooms, workshop, estate, etc.)
3. Which areas must be covered?
4. Are these areas close together or spread out?
5. Is there a dedicated packing, dispatch, cash-up, or stock handling area that needs its own camera?

### Camera intent
6. What is the main purpose? (live viewing, incident review, stock monitoring, staff safety, dispatch verification, perimeter security, etc.)
7. How many cameras does the client expect, or should Unifier recommend the quantity?
8. Does the client need basic viewing only, or human/vehicle analytics as well?
9. Is ColorVu / night colour imaging required?
10. Any preference for dome, bullet, turret, PTZ, hidden, or no preference?

### Recording and viewing
11. Does the client want remote viewing on phone/laptop?
12. Is stable internet available on site?
13. Does the client need a screen/monitor on site for live viewing?
14. How many on-site screens/monitors are needed?
15. How many days of footage retention are required? (7 / 14 / 30+ days)
16. Is the client expecting playback to verify packing per invoice or other operational events?

### Infrastructure
17. Is there power near the recorder/network point?
18. Is there a ceiling / roof void / practical cable route?
19. Approximate cable distances if known?
20. Will trunking, conduit, trenching, or difficult routing likely be needed?
21. Are switches or additional network equipment likely to be required?
22. Are there site restrictions, working-hour limits, or co-working / landlord approvals?
23. Is special access equipment needed, like tall ladders, scaffolding, or a cherry picker?

### Commercial / delivery
24. Does the client want a rough budget first, or a final formal quote?
25. Is a site visit needed before final pricing?
26. Any preferred installation timing or urgency?
27. Any special requirements or risks the client already knows about?

## Extra questions that came up in training
These should not be forgotten just because they are easy to miss in a text enquiry.

- Does the client need a monitor/screen on site to watch movement live?
- Does the dispatch/packing area need separate camera coverage?
- Is internet available and reliable enough for remote access?
- Are the rooms/areas close together or in separate parts of the building?
- How long must footage be stored?

## Quote discipline
- If key answers are missing, issue only a **budgetary estimate**.
- State assumptions clearly.
- If a monitor/screen is needed and no specific size is given, default to `UNI-SCREEN-40INCH` rather than smaller 22/32 inch screen lines.
- For stock/inventory requests, be clear that standard CCTV gives **visual monitoring**, not automatic stock counting.
- If the operational requirement depends heavily on camera placement, recommend a site assessment.
- For dispatch-verification use cases, strongly consider an extra camera dedicated to the packing/dispatch zone rather than only room overview cameras.

## Suggested assistant flow
1. Capture Unity minimum lead fields.
2. Ask the CCTV qualification questions above.
3. Decide whether the response should be:
   - rough budget,
   - budgetary quote with assumptions, or
   - formal quote after site survey.
4. Summarize assumptions before presenting pricing.
5. Record anything reusable back into this checklist when the team corrects or improves it.

## Source references
- `/home/klara/dev/unity/lead-new.asp`
- `/home/klara/dev/unity/sitesurvey.asp`
- `/home/klara/dev/unifier-ops/docs/reference/access-control-quoting-checklist.md`
- Training feedback from Heinrich and Lianne in the Unifier Ops Telegram group on 2026-04-13
