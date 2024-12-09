import { FC } from 'react';

interface HighlightedTextProps {
    text: string;
    matches: string[];
}

const HighlightedText: FC<HighlightedTextProps> = ({ text, matches }) => {
    if (!matches || matches.length === 0) return <span>{text}</span>;

    // Escape special characters in each match string for use in a regular expression
    const escapedMatches = matches.map((match) => match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedMatches.join('|')})`, 'gi');

    const parts = text.split(regex);

    return <span>{parts.map((part, index) => (escapedMatches.some((match) => match.toLowerCase() === part.toLowerCase()) ? <mark key={index}>{part}</mark> : part))}</span>;
};

export { HighlightedText };
