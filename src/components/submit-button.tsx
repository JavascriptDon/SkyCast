'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2, SearchIcon } from 'lucide-react';

interface SubmitButtonProps {
  text?: string;
  loadingText?: string;
}

export function SubmitButton({ text = "Search", loadingText = "Searching..." }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" aria-label={pending ? loadingText : text} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          <SearchIcon className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
}
