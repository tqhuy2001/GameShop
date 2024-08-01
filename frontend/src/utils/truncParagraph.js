export default function truncParagraph(element, maxLength) {
    const text = element;
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    else return text
}
