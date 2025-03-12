export function truncate (text: string, slicedNumber = 60 ) {
    const truncated = text?.length > slicedNumber ? text?.slice(0, 57) + "..." +  text?.split('.').pop() : text
    return truncated
}