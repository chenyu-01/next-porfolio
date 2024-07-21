// @/pages/index.tsx
import ReactMarkdown from 'react-markdown';

const markdown = `Here is some inline code: \`const x = 10;\``;
export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
