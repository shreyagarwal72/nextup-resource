# Import Google Drive Course Collection

## What We're Building

Adding ~50 courses from the ExclusiveTechAccess Google Drive folder as a new course collection, with each course linking to the shared Drive folder.

## Content to Add

From the scraped Drive folder, these courses were found (cleaned names, removing "By ExclusiveTechAccess™"):

1. 1Prompt - License
2. 2 Hour's YouTuber By Jack Denmo
3. 5 Days Hypnotherapy Master Workshop
4. 10k Accelerator Program By Jack
5. 21 Days Law Of Attraction & Happiness Course
6. Aamir Ahmer Digital Marketing Academy
7. Adeem Mirza - Aligning Life and Career
8. Adi Singh - Video Editing Secrets 2025
9. Aejuice - I Want To Learn It All Bundle
10. AI Art Generation
11. AI Automation Agency Accelerator By Liam Ottley
12. AI Automations by Jack
13. AI Builders Community
14. AI Cartoon Videos Masterclass
15. AI Collective
16. AI Copywriting Secrets (Both Volumes)
17. AI Filmmaker Academy - AI Influencer Masterclass
18. AI Forge PRO
19. AI Profit Blueprint
20. AI Profit Boardroom
21. AI Prompt Creators by Matt Zimmerman
22. AI TrailBlazer
23. AI Voice Pioneers
24. Amazon & AI Passive Income Strategy
25. Amit Sangwan - Iconic Relationship Course
26. Ammar Nisar - YouTube Automation Course
27. Amresh Bharti - YouTube & Chat-GPT Course
28. Anchal Jain - Astrology Course
29. Andrew Tate (TRW) - AI Automation Full Course 2025
30. Anish Bajrang - Dropshipping Mastery Course
31. Ankur Warikoo - Effective Communication
32. Ankur Warikoo - How to LinkedIn Course
33. Ankur Warikoo - Make Writing a Career
34. Ankur Warikoo - The Complete Guide to Starting Up
35. Apna College - Delta 6.0
36. Apna College - Sigma 6.0
37. Apparel Cloning System By Devin Zander
38. Arti Creator - YouTube Kids Creator Academy
39. Asif Malik Batch 15
40. Astrology Club - Advance Vastu Shastra Course
41. Awal - Professional English Spoken Course
42. Basic To Advanced Canva Course 2025
43. Bili4u 7 Courses Bundle
44. Blender & After Effects Motion Designing Course
45. Brand Bootcamp Live (Katie Proctor)
46. Build AI Chatbots Without Coding
47. Build No-Code AI Agents & Master AI 2025

## Implementation Steps

### Step 1: Add courses to `src/data/content.ts`

- Add all ~47 courses to the `coursesData` array
- Each course links to the main Google Drive folder: `https://drive.google.com/drive/folders/1RpqtuQzlgO3HVfl5-cQpjOBbuxtXw-8a`
- Assign appropriate categories (AI, Marketing, Development, Design, Business, Communication, Spirituality, etc.)
- Use relevant Unsplash images based on category
- Set `dateAdded` to current date so they show as "New"
- Assign reasonable `duration` and `students` values

### Step 2: Organize by category

Categories for these courses:

- **AI**: AI Art Generation, AI Automation, AI Builders, AI Cartoon Videos, AI Collective, AI Copywriting, AI Filmmaker, AI Forge PRO, AI Profit Blueprint, AI Prompt Creators, AI TrailBlazer, AI Voice Pioneers, Build AI Chatbots, Build No-Code AI Agents
- **Marketing/Business**: 10k Accelerator, Digital Marketing Academy, Amazon Passive Income, Dropshipping Mastery, Brand Bootcamp, Apparel Cloning
- **Video/Design**: Video Editing Secrets, Aejuice Bundle, Blender & After Effects, Canva Course, YouTube Automation, YouTube Kids Creator
- **Development**: Apna College Delta 6.0, Apna College Sigma 6.0
- **Personal Development**: Hypnotherapy, Law of Attraction, Effective Communication, Writing Career, Starting Up, Relationship Course, English Spoken
- **Other**: Astrology, Vastu Shastra, 1Prompt License

### Step 3: Update Stats component

- Stats will auto-update since they pull from `allCourses.length`

## Technical Details

- All courses use the same Drive folder link since individual subfolder IDs aren't accessible from the scrape
- Unsplash stock images used per category (AI, business, design, etc.)
- ~47 new entries added to `coursesData` array in `content.ts`
- `Also` Remove the loading animations overall themes and the site,  add these Courses : 
  Fiverr Freelancing Masterclass : https://t.me/nextupfilebot?start=BQADAQADyxIAAlQyoEar2vryFkkDlhYE
  Philosophy Masterclass 2.0
  https://t.me/+PfWEc2ceKm8zZGI9,
  &nbsp;