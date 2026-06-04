import { KeyboardEvent, SubmitEvent, useRef, useState } from 'react';

import AudioBtn from './AudioBtn/AudioBtn';
import styles from './AIChatForm.module.scss';
import { useSendAIChatMessageMutation } from '@/state/api/aiApi';
import { useTranslations } from 'next-intl';

type SendMessageTrigger = ReturnType<typeof useSendAIChatMessageMutation>[0];

interface AIChatFormProps {
    sendMessage: SendMessageTrigger,
    isLoading: boolean
}

const AIChatForm = ({ sendMessage, isLoading }: AIChatFormProps) => {
    const t = useTranslations('Lesson');

    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const recognitionRef = useRef<any>(null);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;
        if (isListening) recognitionRef.current?.stop();
        
        setText('');
        
        try {
            await sendMessage({ message: messageText.trim() }).unwrap();
        } catch(e) { console.error(e); }
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleSendMessage(text);
    };

    const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await handleSendMessage(text)
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles['ai-form']}>
            <AudioBtn isListening={isListening} setIsListening={setIsListening} setText={setText} isLoading={isLoading} />
            
            {/* <input 
                type='text'
                value={input} 
                onChange={e => setInput(e.target.value)} 
                placeholder="Спроси Gemini..." 
            /> */}
            <textarea 
                rows={1} 
                name="text" 
                id="text"
                placeholder={t('panel.aiInput')} 
                value={text} 
                onChange={e => setText(e.target.value)} 
                onKeyDown={handleKeyDown}
                disabled={isLoading} 
            />
            <button type="submit" disabled={isLoading || !text.trim()}>
                <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff" role="img" aria-hidden="true"><mask id="SendIcon-mask-_r_ad_"><path d="M1.313 3.51a1.406 1.406 0 011.85-1.948l17.825 9.055a.703.703 0 010 1.254L3.162 20.938a1.406 1.406 0 01-1.85-1.947l4.742-7.748zm20.059 7.733H6.05" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" stroke-width="1.5"></path></mask><g mask="url(#SendIcon-mask-_r_ad_)"><rect width="100%" height="100%" fill="currentColor"></rect></g></svg>
            </button>
        </form>
    );
};

export default AIChatForm;