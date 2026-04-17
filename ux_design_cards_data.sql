-- UX & Design Fundamentals Flashcards
-- 100 comprehensive cards covering UX laws, design principles, research methods, 
-- cognitive biases, accessibility, typography, color theory, and interaction patterns

-- First, create the deck (replace the user_id with your actual Clerk user ID)
INSERT INTO decks (title, description, user_id) VALUES 
('UX & Design Fundamentals', 'A comprehensive collection of UX laws, design principles, research methods, cognitive biases, accessibility guidelines, typography concepts, color theory, and interaction design patterns.', 'user_3CUtbg8wo6jxBUPdGH7IXmId98Q')
RETURNING id;

-- Note: Replace 'DECK_ID_HERE' with the actual deck ID returned from the above query
-- Or use this format if your database supports it:
-- WITH deck_insert AS (
--   INSERT INTO decks (title, description, user_id) VALUES 
--   ('UX & Design Fundamentals', 'A comprehensive collection...', 'user_3CUtbg8wo6jxBUPdGH7IXmId98Q')
--   RETURNING id
-- )

-- UX Laws (10 cards)
INSERT INTO cards (deck_id, front, back) VALUES 
('DECK_ID_HERE', 'Fitts''s Law', 'The time to reach a target is a function of the distance to and size of the target. Larger and closer targets are easier to select.'),
('DECK_ID_HERE', 'Hick''s Law', 'The time to make a decision increases logarithmically with the number of options available.'),
('DECK_ID_HERE', 'Miller''s Rule', 'The average person can only keep 7 (±2) items in their working memory at once.'),
('DECK_ID_HERE', 'Jakob''s Law', 'Users spend most of their time on other sites, so they prefer your site to work the same way as all the other sites they already know.'),
('DECK_ID_HERE', 'Law of Proximity', 'Objects near each other are perceived as belonging to the same group or having similar functions.'),
('DECK_ID_HERE', 'Law of Similarity', 'Objects that share visual characteristics (color, shape, size) are perceived as related or grouped together.'),
('DECK_ID_HERE', 'Law of Prägnanz', 'People perceive complex shapes in the simplest form possible. Good design should be simple and uncluttered.'),
('DECK_ID_HERE', 'Pareto Principle', '80% of effects come from 20% of causes. In UX: 80% of users typically use only 20% of features.'),
('DECK_ID_HERE', 'Parkinson''s Law', 'Work expands to fill the time available. In UX: Users will take as much time as you give them to complete a task.'),
('DECK_ID_HERE', 'Zeigarnik Effect', 'People remember interrupted or incomplete tasks better than completed ones. Progress indicators leverage this effect.');

-- Design Principles (15 cards)
INSERT INTO cards (deck_id, front, back) VALUES 
('DECK_ID_HERE', 'Affordance', 'The perceived or actual properties of an object that suggest how it should be used (e.g., buttons appear clickable).'),
('DECK_ID_HERE', 'Signifier', 'A perceivable indicator that communicates appropriate behavior to a person (e.g., underlined text suggests a link).'),
('DECK_ID_HERE', 'Feedback', 'Communicating the result of an action to inform users that their action was received and processed.'),
('DECK_ID_HERE', 'Visibility', 'Making relevant parts of the system observable to users so they know what actions are available.'),
('DECK_ID_HERE', 'Mapping', 'The relationship between controls and their effects. Good mapping uses spatial and cultural conventions.'),
('DECK_ID_HERE', 'Constraint', 'Limiting the possible actions available to prevent errors and guide user behavior toward successful outcomes.'),
('DECK_ID_HERE', 'Consistency', 'Similar operations and elements should behave the same way throughout the interface to reduce learning time.'),
('DECK_ID_HERE', 'Error Prevention', 'Good design prevents problems from occurring in the first place by eliminating error-prone conditions.'),
('DECK_ID_HERE', 'Recognition vs Recall', 'It''s easier to recognize something than recall it from memory. Show don''t tell - make options visible.'),
('DECK_ID_HERE', 'Flexibility and Efficiency', 'Provide accelerators for expert users while keeping the system accessible to novices.'),
('DECK_ID_HERE', 'Aesthetic and Minimalist Design', 'Interfaces should not contain irrelevant information. Every extra unit of information competes for attention.'),
('DECK_ID_HERE', 'Progressive Disclosure', 'Present only the essential information and actions users need at each step, revealing details progressively.'),
('DECK_ID_HERE', 'Hierarchy', 'Organizing content and elements by importance using visual cues like size, color, contrast, and spacing.'),
('DECK_ID_HERE', 'White Space', 'Empty space around elements that helps create visual hierarchy, improves readability, and reduces cognitive load.'),
('DECK_ID_HERE', 'Mental Model', 'A person''s internal representation of how something works. Good design matches users'' mental models.');

-- Research Methods (15 cards)
INSERT INTO cards (deck_id, front, back) VALUES 
('DECK_ID_HERE', 'Card Sorting', 'A method where users organize content into categories that make sense to them, revealing mental models and navigation structures.'),
('DECK_ID_HERE', 'User Interview', 'One-on-one conversations with users to understand their needs, behaviors, and pain points through open-ended questions.'),
('DECK_ID_HERE', 'Usability Testing', 'Observing users as they attempt to complete tasks to identify usability problems and areas for improvement.'),
('DECK_ID_HERE', 'A/B Testing', 'Comparing two versions of a design by showing them to different groups of users to determine which performs better.'),
('DECK_ID_HERE', 'Persona', 'A fictional character created to represent a user segment, based on research and including goals, needs, and behaviors.'),
('DECK_ID_HERE', 'User Journey Map', 'A visual representation of the process a user goes through to accomplish a goal with your product or service.'),
('DECK_ID_HERE', 'Heuristic Evaluation', 'A usability inspection method where evaluators examine a interface and judge its compliance with usability principles.'),
('DECK_ID_HERE', 'Think Aloud Protocol', 'A usability testing method where users verbalize their thoughts as they interact with a system.'),
('DECK_ID_HERE', 'Affinity Diagram', 'A tool for organizing ideas and data by grouping related items together to identify patterns and insights.'),
('DECK_ID_HERE', 'Diary Study', 'A research method where participants record their activities, thoughts, and interactions over time.'),
('DECK_ID_HERE', 'Tree Testing', 'A method for evaluating the findability of topics in a website by testing the underlying structure without visual design.'),
('DECK_ID_HERE', 'First Click Testing', 'Measuring what users click first when trying to complete a task, as this often predicts success.'),
('DECK_ID_HERE', 'Eye Tracking', 'Technology that measures where users look on a screen to understand visual attention patterns.'),
('DECK_ID_HERE', 'Contextual Inquiry', 'A user research method combining observation and interview in the user''s natural environment.'),
('DECK_ID_HERE', '5-Second Test', 'A quick usability test measuring users'' first impressions by showing them a design for 5 seconds.');

-- Cognitive Biases (15 cards)
INSERT INTO cards (deck_id, front, back) VALUES 
('DECK_ID_HERE', 'Confirmation Bias', 'The tendency to search for, interpret, and recall information that confirms pre-existing beliefs.'),
('DECK_ID_HERE', 'Anchoring Bias', 'The tendency to rely heavily on the first piece of information encountered when making decisions.'),
('DECK_ID_HERE', 'Availability Heuristic', 'Estimating probability based on how easily examples come to mind rather than actual statistical probability.'),
('DECK_ID_HERE', 'Loss Aversion', 'People feel the pain of losing something more strongly than the pleasure of gaining something of equal value.'),
('DECK_ID_HERE', 'Choice Overload', 'When too many options are available, decision-making becomes difficult and satisfaction decreases.'),
('DECK_ID_HERE', 'Social Proof', 'People look to the actions of others to guide their own behavior, especially in uncertain situations.'),
('DECK_ID_HERE', 'Endowment Effect', 'People value things more highly when they own them compared to when they don''t own them.'),
('DECK_ID_HERE', 'Recency Effect', 'The tendency to better remember information that was presented most recently.'),
('DECK_ID_HERE', 'Primacy Effect', 'The tendency to better remember information presented at the beginning of a sequence.'),
('DECK_ID_HERE', 'Framing Effect', 'Drawing different conclusions from the same information depending on how it is presented.'),
('DECK_ID_HERE', 'Bandwagon Effect', 'The tendency to adopt beliefs or behaviors because many others have done so.'),
('DECK_ID_HERE', 'Status Quo Bias', 'The preference for things to stay the same by doing nothing or maintaining current decisions.'),
('DECK_ID_HERE', 'Sunk Cost Fallacy', 'Continuing to invest in a project based on previously invested resources rather than future value.'),
('DECK_ID_HERE', 'Optimism Bias', 'The tendency to overestimate positive outcomes and underestimate negative ones.'),
('DECK_ID_HERE', 'Dunning-Kruger Effect', 'People with limited knowledge or skills overestimate their own competence in that area.');

-- Accessibility (10 cards)
INSERT INTO cards (deck_id, front, back) VALUES 
('DECK_ID_HERE', 'WCAG', 'Web Content Accessibility Guidelines - international standards for making web content accessible to people with disabilities.'),
('DECK_ID_HERE', 'Screen Reader', 'Assistive technology that converts digital text to speech or braille for users who are blind or have low vision.'),
('DECK_ID_HERE', 'Alt Text', 'Alternative text that describes images for screen readers and appears when images fail to load.'),
('DECK_ID_HERE', 'Color Contrast', 'The difference in luminance between text and background colors, crucial for readability and accessibility.'),
('DECK_ID_HERE', 'Focus Indicator', 'A visual indicator showing which element currently has keyboard focus, essential for keyboard navigation.'),
('DECK_ID_HERE', 'Semantic HTML', 'Using HTML elements according to their meaning rather than appearance to convey structure to assistive technologies.'),
('DECK_ID_HERE', 'ARIA Labels', 'Accessibility attributes that provide additional information about elements for assistive technologies.'),
('DECK_ID_HERE', 'Tab Order', 'The sequence in which elements receive focus when navigating with the Tab key.'),
('DECK_ID_HERE', 'Skip Links', 'Hidden links that allow keyboard users to jump directly to main content, bypassing navigation.'),
('DECK_ID_HERE', 'Inclusive Design', 'Designing products to be accessible and usable by as many people as possible, regardless of abilities.');

-- Typography (10 cards)
INSERT INTO cards (deck_id, front, back) VALUES 
('DECK_ID_HERE', 'Kerning', 'The adjustment of space between individual letter pairs to achieve visually pleasing and readable text.'),
('DECK_ID_HERE', 'Leading', 'The vertical space between lines of text, also known as line spacing or line height.'),
('DECK_ID_HERE', 'Tracking', 'The uniform adjustment of space between all letters in a word or line of text.'),
('DECK_ID_HERE', 'Hierarchy', 'The arrangement of text elements to show their relative importance through size, weight, and style.'),
('DECK_ID_HERE', 'Serif', 'Typefaces with small decorative strokes extending from the main strokes of letters, traditionally used for body text.'),
('DECK_ID_HERE', 'Sans Serif', 'Typefaces without decorative strokes, often considered more modern and used for digital interfaces.'),
('DECK_ID_HERE', 'X-Height', 'The height of lowercase letters, excluding ascenders and descenders, affecting readability at small sizes.'),
('DECK_ID_HERE', 'Baseline', 'The invisible line upon which letters sit, used as a reference point for vertical alignment.'),
('DECK_ID_HERE', 'Widow', 'A single word or short line appearing alone at the end of a paragraph or column, considered poor typography.'),
('DECK_ID_HERE', 'Orphan', 'A single word or short line appearing alone at the beginning of a page or column.');

-- Color Theory (10 cards)
INSERT INTO cards (deck_id, front, back) VALUES 
('DECK_ID_HERE', 'Color Wheel', 'A circular diagram showing the relationship between primary, secondary, and tertiary colors.'),
('DECK_ID_HERE', 'Complementary Colors', 'Colors opposite each other on the color wheel that create high contrast and visual vibration when used together.'),
('DECK_ID_HERE', 'Analogous Colors', 'Colors adjacent to each other on the color wheel that create harmonious and pleasing combinations.'),
('DECK_ID_HERE', 'Triadic Colors', 'Three colors evenly spaced on the color wheel that offer high contrast while retaining harmony.'),
('DECK_ID_HERE', 'Monochromatic', 'A color scheme using variations in lightness and saturation of a single color.'),
('DECK_ID_HERE', 'Hue', 'The pure spectrum colors commonly referred to by color names (red, blue, yellow, etc.).'),
('DECK_ID_HERE', 'Saturation', 'The intensity or purity of a color, from gray (low saturation) to vivid (high saturation).'),
('DECK_ID_HERE', 'Value', 'The lightness or darkness of a color, independent of its hue or saturation.'),
('DECK_ID_HERE', 'Color Temperature', 'The warmth or coolness of a color, with warm colors advancing and cool colors receding.'),
('DECK_ID_HERE', 'Color Psychology', 'The study of how colors affect human behavior, emotions, and decision-making.');

-- Interaction Design Patterns (15 cards)
INSERT INTO cards (deck_id, front, back) VALUES 
('DECK_ID_HERE', 'Breadcrumbs', 'A navigation aid showing users their current location within a website''s hierarchy.'),
('DECK_ID_HERE', 'Pagination', 'Dividing content into discrete pages with navigation controls to move between them.'),
('DECK_ID_HERE', 'Infinite Scroll', 'Automatically loading content as the user scrolls down, creating a seamless browsing experience.'),
('DECK_ID_HERE', 'Modal Dialog', 'A window that appears on top of the main content, requiring user interaction before returning to the main interface.'),
('DECK_ID_HERE', 'Accordion', 'A vertically stacked list of items where clicking an item reveals or hides additional content.'),
('DECK_ID_HERE', 'Tabs', 'A navigation pattern that allows users to switch between different views or content sections.'),
('DECK_ID_HERE', 'Carousel', 'A rotating set of content or images that users can navigate through manually or automatically.'),
('DECK_ID_HERE', 'Dropdown Menu', 'A list of options that appears when a user clicks or hovers over a trigger element.'),
('DECK_ID_HERE', 'Search Autocomplete', 'Providing suggested search terms as users type to help them complete their queries faster.'),
('DECK_ID_HERE', 'Progressive Enhancement', 'Building core functionality first, then adding enhanced features for more capable browsers or devices.'),
('DECK_ID_HERE', 'Lazy Loading', 'Deferring the loading of content until it''s needed, improving initial page load performance.'),
('DECK_ID_HERE', 'Pull-to-Refresh', 'A mobile interaction pattern where users pull down on content to refresh or reload it.'),
('DECK_ID_HERE', 'Swipe Gestures', 'Touch-based interactions using finger movements across the screen for navigation or actions.'),
('DECK_ID_HERE', 'Floating Action Button', 'A prominent circular button that floats above content to promote a primary action.'),
('DECK_ID_HERE', 'Skeleton Screen', 'A placeholder showing the structure of content while it loads, reducing perceived wait time.');