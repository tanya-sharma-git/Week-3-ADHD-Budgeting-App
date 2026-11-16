# Penny Pal — Week 4 Submission

## Links

1. My GitHub repository: https://github.com/tanya-sharma-git/Week-3-ADHD-Budgeting-App
2. My live app on Vercel: https://week-3-adhd-budgeting-app-drab.vercel.app
3. My database diagram (a link to the file in my repository): https://github.com/tanya-sharma-git/Week-3-ADHD-Budgeting-App/blob/main/docs/database-diagram.md
4. My ADR folder (a link to `docs/adr` in my repository): https://github.com/tanya-sharma-git/Week-3-ADHD-Budgeting-App/tree/main/docs/adr

## Documents

1. My Notion links:
   - Week 4 Coding Challenge (ADRs + Database Design): https://app.notion.com/p/40f71f8c85e08004aed1efe7dae0af4b
   - Week 2 Product Specs + Backlog: https://app.notion.com/p/40371f8c85e080d79a03f532a00676b4
2. Any other document links:
   - MVP #1 acceptance criteria: https://github.com/tanya-sharma-git/Week-3-ADHD-Budgeting-App/blob/main/docs/requirements/mvp1-acceptance-criteria.md
   - Content guidelines: https://github.com/tanya-sharma-git/Week-3-ADHD-Budgeting-App/blob/main/docs/content-guidelines.md

## What I Did

This week was a lot of learning-by-doing, and it's my favourite way to learn. I worked with Claude to build Penny Pal, an ADHD-friendly budgeting web app built around just one number: what's left to spend this week. Users set a monthly budget, and Penny Pal gives you a weekly budget. This way, users know how to stagger their spending without feeling anxious about over or under spending. I built out the entire MVP, one ticket at a time. I asked Claude to take me through the details of every step, sometimes asking it to further break down things I didn't understand (there were a lot of those!). We started with dog feeding all the info from week 2-3 and lecture notes, and setting up the tools (vercel, supabase, node.js). Next, Claude created the project and pushed it to GitHub, and then 'scaffolded' the app with Next.js and material UI.

Then came the heavy technical stuff. We planned the technical architecture and Claude sketched it out, documenting the ADRs in the process. We designed and created the database using three tables: profiles (who each person is), budgets (their monthly amount), and transactions (each entry), linked by a user_id so every row knows whose it is. Next, we connected the app to Supabase and then started building the features, testing each as it was built. It was super exciting to see these come to life because I've never done this before 😀.

We had to make one change from what was planned out in the tickets: I wrote an 'app lock' like face ID for security, not realizing this was a web app 😅, so we pivoted to a google sign-in and an optional auto sign-out after inactivity. Once the app was up and running, I didn't love the UX and the content design, so I wrote a content style guide for copy and redesigned the screens to be more to my liking. Once I finalized and tested everything, we deployed to the internet (yay!!). Then I tested the live app myself and with two other accounts/devices. All good!

## What I Learned

I learned to never fully trust Claude, even for small things! There were so many times when Claude was inconsistent, pulled up the wrong info from the tickets or simply said "I don't have that information" when I gave it my Week 2 notion at the start of the session. This was very frustrating, but I followed the "show me receipts" method and asked Clause to give proof of whatever it did at every step of the way.

I also learned what goes into building an app from scratch, which was very cool. I did feel from time to time that I didn't know enough and I was just following what Claude was telling me (grab this key, set up authentication etc). But whenever I felt like I wasn't in the driver's seat I would go back and ask Claude to break down everything until I understood. I'm obviously still no expert but I hope my knowledge improves as I do more!

I really enjoyed this week's homework even though there was a learning curve. I'm a lot more comfortable and confident steering Claude, catching its mistakes, and owning the final calls myself!
