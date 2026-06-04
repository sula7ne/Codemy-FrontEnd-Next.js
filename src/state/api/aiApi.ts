import { AIHistoryResponse, AIMessage, AIResponse, AISendMessagePayload } from "@/types/ai";

import { authApi } from "./authApi";

export const chatApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getAIChatHistory: build.query<AIMessage[], void>({
            query: () => ({
                url: '/ai/history',
                method: 'GET'
            }),
            transformResponse: (response: AIHistoryResponse): AIMessage[] => {
                if (!response || !response.contents) return [];
                
                return response.contents.map((msg: any) => ({
                    role: msg.role.toUpperCase() as "USER" | "MODEL",
                    text: msg.parts?.[0]?.text || ""
                }));
            },
        }),
        sendAIChatMessage: build.mutation<AIResponse, AISendMessagePayload>({
            query: (payload) => ({
                url: '/ai/message',
                method: 'POST',
                body: payload,
            }),
            async onQueryStarted({ message }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    authApi.util.updateQueryData('getAIChatHistory' as any, undefined, (draft: any) => {
                        draft.push({ role: "USER", text: message });
                    })
                );
                
                try {
                    const { data } = await queryFulfilled;
                    
                    dispatch(
                        authApi.util.updateQueryData('getAIChatHistory' as any, undefined, (draft: any) => {
                            const modelText = 'text' in data ? (data as any).text : (data as any).parts?.[0]?.text || "";
                            draft.push({ role: "MODEL", text: modelText });
                        })
                    );
                } catch (err) {
                    console.error('Failed to send message to Gemini:', err);
                    patchResult.undo();
                }
            },
        }),
    })
});

export const {
    useGetAIChatHistoryQuery,
    useSendAIChatMessageMutation
} = chatApi;