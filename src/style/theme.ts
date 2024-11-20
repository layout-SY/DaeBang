export type Colorkey =
    | 'primary'
    | 'secondary'
    | 'third'
    | 'forth'
    | 'light-background'
    | 'neutral-background'
    | 'dark-background'
    | 'text';
export type HeadingSize = 'large' | 'medium' | 'small';
export type LayoutWidth = 'small' | 'medium' | 'large';

interface Theme {
    name: string;
    colors: Record<Colorkey, string>;
    heading: {
        [key in HeadingSize]: {
            fontSize: string;
        };
    };
    borderRadius: {
        default: string;
    };
    layout: {
        width: {
            [key in LayoutWidth]: string;
        };
    };
}

export const theme: Theme = {
    name: 'main',
    colors: {
        primary: '#64B5F6',
        secondary: '#6B95BC',
        third: '#D5A667',
        forth: '#9C7236',
        'light-background': '#F2FAFF',
        'neutral-background': '#9FADBD',
        'dark-background': '#3B4856',
        text: '#3B4856',
    },
    heading: {
        large: {
            fontSize: '2rem',
        },
        medium: {
            fontSize: '1.5rem',
        },
        small: {
            fontSize: '1rem',
        },
    },
    borderRadius: {
        default: '4px',
    },
    layout: {
        width: {
            small: '320px',
            medium: '760px',
            large: '1020px',
        },
    },
};
