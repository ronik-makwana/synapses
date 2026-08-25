import React, { FC, useEffect, useRef } from 'react';
import { EdgeLabelRenderer, useReactFlow } from 'reactflow';

// Restore props needed for editing
interface EdgeLabelEditorProps {
    edgeId: string;
    initialLabel: string;
    setEditedLabel: (label: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

const EdgeLabelEditor: FC<EdgeLabelEditorProps> = ({ 
    edgeId, initialLabel, setEditedLabel, onSave, onCancel 
}) => {
    console.log(`[EdgeLabelEditor] Rendering input for edgeId: ${edgeId}, initialLabel: "${initialLabel}"`);
    
    const { getEdge } = useReactFlow();
    const edge = getEdge(edgeId);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Focus and select input when component mounts
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            }, 50); // Small delay to ensure DOM is ready
        }
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') onSave(); 
        if (event.key === 'Escape') onCancel();
    };

    // If edge is not found, display the input at center of screen as fallback
    if (!edge) {
        console.warn(`[EdgeLabelEditor] Could not find edge with id: ${edgeId}`);
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    pointerEvents: 'all'
                }}
                className="nodrag nopan"
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={initialLabel}
                    onChange={(e) => setEditedLabel(e.target.value)}
                    onBlur={onSave}
                    onKeyDown={handleKeyDown}
                    className="px-2 py-1 border-2 border-blue-500 rounded bg-white shadow-md text-sm"
                    style={{ minWidth: '100px' }}
                />
            </div>
        );
    }

    // Fallback to center of screen if edge doesn't have position info
    const sourceX = (edge as unknown as Record<string, unknown>).sourceX as number | undefined || 0;
    const targetX = (edge as unknown as Record<string, unknown>).targetX as number | undefined || 0;
    const sourceY = (edge as unknown as Record<string, unknown>).sourceY as number | undefined || 0;
    const targetY = (edge as unknown as Record<string, unknown>).targetY as number | undefined || 0;

    const midX = sourceX !== undefined && targetX !== undefined
        ? (sourceX + targetX) / 2
        : window.innerWidth / 2;
    const midY = sourceY !== undefined && targetY !== undefined
        ? (sourceY + targetY) / 2
        : window.innerHeight / 2;

    return (
        <EdgeLabelRenderer>
            <div
                style={{
                    position: 'absolute',
                    transform: `translate(-50%, -50%) translate(${midX}px, ${midY}px)`,
                    pointerEvents: 'all',
                    zIndex: 1000
                }}
                className="nodrag nopan"
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={initialLabel}
                    onChange={(e) => setEditedLabel(e.target.value)}
                    onBlur={onSave}
                    onKeyDown={handleKeyDown}
                    className="px-2 py-1 border-2 border-blue-500 rounded bg-white shadow-md text-sm"
                    style={{ minWidth: '100px' }}
                />
            </div>
        </EdgeLabelRenderer>
    );
};

export default EdgeLabelEditor; 