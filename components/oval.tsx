export const Oval = ({ color, className }: { color: string, className: string }) => {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill={ color == "gold" ? "#FBC901" : color == "silver" ? "#CDCDCD" : color == "bronze" ? "#836900" : "" }/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0363 19.1741C14.9708 19.1741 18.971 15.1739 18.971 10.2394C18.971 5.3049 14.9708 1.30469 10.0363 1.30469C5.10177 1.30469 1.10156 5.3049 1.10156 10.2394C1.10156 15.1739 5.10177 19.1741 10.0363 19.1741Z" fill={ color == "gold" ? "#FFD21B" : color == "silver" ? "#D6D6D6" : color == "bronze" ? "#846A00" : "" }/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0363 19.1741C14.9708 19.1741 18.971 15.1739 18.971 10.2394C18.971 5.3049 14.9708 1.30469 10.0363 1.30469C5.10177 1.30469 1.10156 5.3049 1.10156 10.2394C1.10156 15.1739 5.10177 19.1741 10.0363 19.1741Z" fill="url(#paint0_linear_400_4733)" fill-opacity="0.3"/>
            <path d="M9.74942 6.39328C9.85376 6.15605 10.1903 6.15605 10.2947 6.39328L11.34 8.77008C11.37 8.8383 11.4245 8.89279 11.4928 8.9228L13.8696 9.96817C14.1068 10.0725 14.1068 10.4091 13.8696 10.5134L11.4928 11.5588C11.4245 11.5888 11.37 11.6433 11.34 11.7115L10.2947 14.0883C10.1903 14.3255 9.85376 14.3255 9.74942 14.0883L8.70405 11.7115C8.67404 11.6433 8.61955 11.5888 8.55133 11.5588L6.17453 10.5134C5.9373 10.4091 5.9373 10.0725 6.17453 9.96817L8.55133 8.9228C8.61955 8.89279 8.67404 8.8383 8.70405 8.77008L9.74942 6.39328Z" fill="white"/>
            <defs>
                <linearGradient id="paint0_linear_400_4733" x1="1.10156" y1="1.30469" x2="10.0363" y2="19.1741" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white" stop-opacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    )
}

export default Oval;
