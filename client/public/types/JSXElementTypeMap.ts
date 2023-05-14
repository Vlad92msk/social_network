/**
 * Создает отображение (маппинг) типов для всех элементов JSX, определенных в JSX.IntrinsicElements.
 */
export type JSXElementTypeMap = {
    [K in keyof JSX.IntrinsicElements]: JSX.IntrinsicElements[K];
};
