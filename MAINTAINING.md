# Maintaining the CV, website and application documents

A checklist for every time something new happens (a paper, an award, a course…), so the CV, the website and the
job-application documents stay in sync.

**Order of work:** always **CV → website → documents**. The CV is the source of truth; the website and the
documents are copied from it.

---

## 1. Where everything lives

| Thing | Location | Notes |
|---|---|---|
| **CV** | LaTeX source (outside this repo) → compiled PDF at `CV___Samia_Choueiri.pdf` | The Home and Experience "Download CV" buttons link to the PDF (`profile.cv` in `assets/js/data/profile.js`). Replace the PDF after every CV change. |
| **Publications** | `assets/data/publications.bib` | The one file the website reads. Keep the CV's `.bib` identical to it (see §4). |
| **Website content** | `assets/js/data/*.js` | One file per topic, listed in §3. Never put content in the `.html` files. |
| **Website images** | `assets/media/<page>/` | Set the item's `image` field to the path. |
| **Application documents** | `documents/` | Private: `documents/` is in `.gitignore` and is never pushed. |

Documents in `documents/`:

| File | What it is |
|---|---|
| `cover_letter.docx` | Master cover letter (yellow = change per application) |
| `research_statement.docx` | Research statement with numbered references |
| `teaching_statement.docx` | Teaching statement |
| `diversity_statement.docx` | Diversity statement |
| `course_offering.docx` | Detailed list of courses you can teach / develop |
| `references.docx` | Your references (contact details) |

Highlight colors in the documents: **yellow** = changes for every application (university, department, position,
course codes); **green** = a fact still to fill in or confirm once.

---

## 2. Checklists by item type

Each checklist is **CV → website → documents**. "Numbers" means a count that appears in the text of a document; the
full list of these is in §5, so you can check them all at once.

### New publication

1. **CV:** add the BibTeX entry to the CV's `.bib` (Publications section updates itself). Write your name as
   `\textbf{S. Choueiri}`.
2. **Website:**
   - Paste the same entry into `assets/data/publications.bib`. The publications page, home stats, and home
     "papers per year" chart update automatically.
   - Optional extras in `assets/js/data/publications.js` → `extras`, keyed by the citation key:
     `featured: true` (shows on the home page), `award: '…'`, `links: [{ label: 'PDF', url: '…' }]`,
     `venueShort: '…'` (if the automatic short venue name looks wrong).
   - Research page: the paper appears under a research area if its title contains one of that area's `keywords`
     in `assets/js/data/research.js`. Add a keyword if it should appear and doesn't.
   - If the code is public, add it to `assets/js/data/github.js` (see "New GitHub project").
3. **Documents:**
   - `research_statement.docx`: add one sentence about the paper in the paragraph for its research line, and add
     it to the reference list. **Tip:** append the new reference at the **end** of the list and cite that number,
     so the existing [1]–[n] numbers don't shift.
   - Update the counts: **total papers** and **first-author papers** (cover letter, research statement), and the
     venue list if it is a new venue.
   - If it is an education paper, also consider the teaching statement (Pedagogical Approach).

### New award

1. **CV:** Honors & Awards section.
2. **Website:** `assets/js/data/recognition.js` → `awards` (newest first). Use `category: 'research'` for
   paper/poster/presentation awards (these are counted on the home page) or `'competition'`. Add `series:
   'FABRIC KNIT'` for recurring venues, `note:` for the paper title, `links:`, and a photo in
   `assets/media/awards/` via `image` (`imageFit: 'contain'` for certificates).
   If it is for a paper, also add `award: '…'` for that paper in `publications.js` → `extras`.
3. **Documents:** cover letter (awards sentence) and research statement (the sentence about that work). Update the
   **award counts**.

### New talk or poster

1. **CV:** Invited Talks / Poster Presentations.
2. **Website:** `assets/js/data/presentations.js` → `talks` or `posters` (newest first), with `links` to the slides
   or poster.
3. **Documents:** usually none. Mention it only if it is a major invited talk (cover letter or research statement).

### New course taught

1. **CV:** Teaching Experience.
2. **Website:** `assets/js/data/teaching.js` → `institutions[].courses` (`title`, `code`, `terms`, `desc`). The
   home "Teaching" tile updates automatically. Update `evaluationsUrl` if you have new evaluations.
3. **Documents:**
   - `teaching_statement.docx` → "Teaching at the University of South Carolina" (or the right institution):
     add a bullet; update the **average evaluation**.
   - `course_offering.docx` → "Courses I Have Taught".
   - `cover_letter.docx` → teaching paragraph (course list, **years of teaching**).

### New lab series or teaching material

1. **CV:** Teaching Materials / Lab Development.
2. **Website:** `assets/js/data/teaching.js` → `materials` (`labs` must be a **number**; it feeds the home stats),
   with `role`, `platform`, `links`, and a figure in `assets/media/teaching/`.
3. **Documents:** teaching statement ("Hands-on Labs and Workshops" bullets), cover letter (labs sentence),
   `course_offering.docx` (the course it supports). Update the **lab counts** (series and total labs).

### New workshop delivered

1. **CV:** Workshops / Training Delivered.
2. **Website:** `assets/js/data/teaching.js` → `workshops` (newest first). `attendees` must be a **number**.
3. **Documents:** teaching statement (workshop bullets), cover letter and diversity statement. Update the
   **workshop count** and **total participants**.

### New grant / funded project

1. **CV:** Grants / Funded Projects.
2. **Website:** `assets/js/data/research.js` → `grants` (`title`, `sponsor`, `amount`, `pi`, `start`, `end`,
   `contribution`, `links`). The home stats and the Research funding tile update automatically.
3. **Documents:** research statement → funded-projects list (full title, award number, your role); cover letter
   and research statement → **number of funded projects**.

### New position or degree

1. **CV:** Experience / Education.
2. **Website:** `assets/js/data/experience.js` → `positions` or `education` (`start`/`end` as `'YYYY-MM'`, or
   `'present'`), logo in `assets/media/experience/`. The home Experience timeline updates automatically.
3. **Documents:** cover letter (opening paragraph), and the teaching statement if it is a teaching role. When you
   graduate, update the **graduation date** in the cover letter.

### New certification

1. **CV:** Certifications.
2. **Website:** `assets/js/data/experience.js` → `certifications` (in the right `group`), with the Credly or
   certificate link.
3. **Documents:** cover letter (if it is relevant, e.g. a teaching or industry certification) and
   `course_offering.docx` (the course it qualifies you to teach).

### New service (reviewing, judging, committees)

1. **CV:** Professional Service.
2. **Website:** `assets/js/data/experience.js` → `service`.
3. **Documents:** diversity statement (judging, outreach) or teaching statement (mentoring), if relevant.

### New mentored students or projects

1. **CV:** Mentoring / Student Supervision.
2. **Website:** nothing dedicated yet (mention it in the related grant's `contribution` in `research.js` if useful).
3. **Documents:** teaching statement ("Mentoring Students"), research statement (funded-projects list), cover
   letter (mentoring sentence).

### New GitHub project

1. **CV:** Projects (optional).
2. **Website:** the GitHub page lists new public repos automatically. To feature one with a description, add it to
   `assets/js/data/github.js` → `featured`. Link it from the paper's `extras` in `publications.js` if it belongs to
   a paper.
3. **Documents:** research statement (link from the sentence about that work), if it is significant.

### New research area or direction

1. **CV:** Research Interests.
2. **Website:** `assets/js/data/research.js` → `areas` (`title`, `text`, `tags`, `keywords`, figure in
   `assets/media/research/`), and `assets/js/data/profile.js` → `interests` if it is a headline topic.
3. **Documents:** research statement (opening sentence and "Moving forward" paragraph), cover letter (expertise
   paragraph).

---

## 3. Website data files at a glance

| File | Holds |
|---|---|
| `assets/js/data/profile.js` | Name, role, bio, portrait, CV link, social links, research interests, news |
| `assets/data/publications.bib` | All publications |
| `assets/js/data/publications.js` | Per-paper extras (featured, awards, links) |
| `assets/js/data/research.js` | Research areas, grants |
| `assets/js/data/teaching.js` | Courses, lab series, workshops |
| `assets/js/data/experience.js` | Education, positions, skills, certifications, service, affiliations, languages |
| `assets/js/data/recognition.js` | Awards |
| `assets/js/data/presentations.js` | Talks, posters |
| `assets/js/data/github.js` | Featured GitHub projects |
| `assets/js/data/site.js` | Navigation and home-page tile descriptions |

Home-page numbers and charts are **computed** from these files. Never type a count into the website; keep the
numeric fields (`labs`, `attendees`, grant `amount`) numeric and the site does the rest.

Preview before pushing: run `python -m http.server` in the repo root and open http://localhost:8000.

---

## 4. Keeping it scalable: recommendations

1. **One publications file.** The website reads `assets/data/publications.bib`. Point your LaTeX CV at that same
   file (e.g. `\addbibresource{…/assets/data/publications.bib}` or `\bibliography{…}`) instead of keeping a separate
   copy, so a new paper is added exactly once. If you keep a copy (such as `ref.bib` in the repo root), copy it over
   `assets/data/publications.bib` after every change, because the site does not read `ref.bib`.
2. **Keep the CV source next to the site.** Putting the LaTeX CV in a `cv/` folder in this repo makes step 1
   trivial, and every change (CV, website) is in one place and one commit. The compiled PDF stays at
   `CV___Samia_Choueiri.pdf`.
3. **Treat `documents/` as master templates.** Never edit the masters for a specific job. For each application,
   copy them into `documents/applications/<University>_<Position>/`, fill in the yellow placeholders there, and
   export PDFs. Improvements that apply to every application go back into the masters.
4. **Update the numbers in one sweep.** Counts appear in several documents (see §5). After any update, go through
   that table once instead of hunting for numbers piece by piece.
5. **Write once, reuse.** When you describe a new paper or project for the website (`research.js`, `github.js`),
   reuse that sentence in the research statement, and vice versa, so the wording stays consistent.
6. **Review once a semester.** Check the funding programs named in the research statement (they change; e.g. NSF
   CC* was waiting for a new solicitation in late 2025), the course codes, and the graduation date.

---

## 5. Numbers that appear in the documents

The website computes its own counts, but the documents contain typed numbers. When one of these changes, update
every place listed.

| Number (as of Nov 2026) | Appears in |
|---|---|
| **19** peer-reviewed publications, **7** as first author | Cover letter (expertise paragraph), research statement (opening paragraph) |
| Awards: **Best Paper** (BlackSeaCom 2026), **3** Best Poster Awards at FABRIC KNIT | Cover letter, research statement |
| **7** funded projects (5 NSF, 2 ONR) | Cover letter, research statement (funded-projects list) |
| **4** lab series / **30** labs led; **2** series / **12** labs contributed | Cover letter, teaching statement, course offering |
| **8** national workshops, about **700** participants (CyberTraining: **4** editions, **542** attendees) | Cover letter, teaching statement, diversity statement |
| Average student evaluation **4.47/5.00** | Teaching statement (and cover letter, if used) |
| **More than five years** of university teaching; **4** years at AUST (2018–2022) | Cover letter, teaching statement |
| Expected graduation **August 2028** | Cover letter |
| About **500** students in robotics and Python camps | Teaching statement |

---

## 6. Before sending an application

- [ ] Copy the masters into `documents/applications/<University>_<Position>/`.
- [ ] Replace every **yellow** highlight (date, recipient, department, university, position, start date, course
      codes, "why this department" sentence) and remove the highlighting.
- [ ] No **green** highlight left.
- [ ] Numbers match §5 and the latest CV.
- [ ] The CV PDF on the website is the latest version.
- [ ] Export to PDF and read the PDFs once.
