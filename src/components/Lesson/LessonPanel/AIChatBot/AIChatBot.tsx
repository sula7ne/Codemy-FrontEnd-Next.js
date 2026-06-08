import { Dispatch, KeyboardEvent, SetStateAction, SubmitEvent, useState } from 'react';
import { useGetAIChatHistoryQuery, useSendAIChatMessageMutation } from '@/state/api/aiApi';

import AIChatForm from './AIChatForm/AIChatForm';
import AIChatMessages from './AIChatMessages/AIChatMessages';
import { lessonPanelId } from '@/types/lessonPanel';
import styles from './AIChatBot.module.scss';
import { useAuth } from '@/state/hooks/useAuth';
import { useTranslations } from 'next-intl';

interface AIChatBotProps {
    setPanel: Dispatch<SetStateAction<lessonPanelId | null>>
}

const AIChatBot = ({ setPanel }: AIChatBotProps) => {
    const { isAuth } = useAuth();
    const t = useTranslations('Lesson');

    const { data: messages, isLoading: isHistoryLoading } = useGetAIChatHistoryQuery();
    const [sendMessage, { isLoading }] = useSendAIChatMessageMutation();

    return (
        <div className={styles['ai-chatbot']}>
            <section className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{t('panel.ai')}</h1>
                </div>

                {isHistoryLoading ? (
                    <div className={styles.empty}>
                        <p>Загрузка истории сообщений...</p>
                    </div>) 
                    : 
                    (messages && messages.length) ?
                        <AIChatMessages messages={messages} isLoading={isLoading} />
                        :
                        <div className={styles.empty}>
                            <p>{isAuth ? t('panel.aiDescription') : 'Пожалуйста, авторизуйтесь, чтобы начать общение с ИИ ментором!'}</p>
                        </div>
                }
            </section>
            
            <AIChatForm sendMessage={sendMessage} isLoading={isLoading} />
        </div>
    );
};

export default AIChatBot;