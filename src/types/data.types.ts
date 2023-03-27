import {bool} from "yup";

export type FetchedBooks = {
  issueYear: string;
  rating?: number;
  title: string;
  authors: string[];
  image?: {
    url: string;
  };
  categories: string[];
  id: number;
  booking: {
    id: number;
    order: boolean;
    dateOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  };
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: string;
    dateHandedTo: string;
    recipientId: number;
    recipientFirstName: string;
    recipientLastName: string;
  };
  histories?: [
    {
      id: number;
      userId: number;
    }
  ];
};

export type FetchedBook = {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  images: { url: string }[];
  categories: string[];
  comments: Review[];
  booking: {
    id: number;
    order: boolean;
    dateOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  };
  delivery: {
    id: number;
    handed: boolean;
    dateHandedFrom: string;
    dateHandedTo: string;
    recipientId: number;
    recipientFirstName: string;
    recipientLastName: string;
  };
  histories: [
    {
      id: number;
      userId: number;
    }
  ];
};

export type Category = {
  name: string;
  path: string;
  id: number;
  count?: number;
};

export type FetchedError = {
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<any, any>;
  };
  data: null;
};

export type Review = {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
  };
};

export type User = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
};

export type Profile = {
    id: number,
    username: string,
    email: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    firstName: string,
    lastName: string,
    phone: string,
    role: {
        id: number,
        name: string,
        description: string,
        type: string
    },
    comments: [
        {
            id: number,
            rating: number,
            text: string | null,
            bookId: number
        }
    ],
    avatar: string | null,
    booking: {
        id: number,
        order: boolean,
        dateOrder: string,
        book: {
            id: number,
            title: string,
            rating: number,
            issueYear: string,
            authors: string[],
            image: string | null
        }
    },
    delivery: {
        id: number,
        handed: boolean,
        dateHandedFrom: string,
        dateHandedTo: string,
        book: {
            id: number,
            title: string,
            rating: number,
            issueYear: null | string,
            authors: string[],
            image: string | null
        }
    },
    history: {
        id: number,
        books: [
            {
                id: number,
                title: string,
                rating: number,
                issueYear: string | null,
                authors: string[],
                image: string | null
            },
        ]
    }
}

export type UploadAvatarResponse = [
    {
        id: number,
        name: string,
        alternativeText: string | null,
        caption: string | null,
        width: number,
        height: number,
        formats: {
            thumbnail: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                path: string | null,
                width: number,
                height: number,
                size: number,
                url: number
            },
            large: {
                name: number,
                hash: number,
                ext: number,
                mime: number,
                path: string | null,
                width: number,
                height: number,
                size: number,
                url: string
            },
            medium: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                path: string | null
                width: number,
                height: number,
                size: number,
                url: string
            },
            small: {
                name: string,
                hash: string,
                ext: string,
                mime: string,
                path: string | null,
                width: number,
                height: number,
                size: number,
                url: string
            }
        },
        hash: string,
        ext: string,
        mime: string,
        size: number,
        url: string,
        previewUrl: string | null,
        provider: string,
        provider_metadata: string | null,
        createdAt: string,
        updatedAt: string
    }
]



export interface CommentDto {
    data: {
        rating: number,
        text: string,
        book: string,
        user: number,
    }
}

export interface CommentResponse {
    data: {
        id: number,
        attributes: {
            rating: number,
            text: string,
            createdAt: string,
            updatedAt: string,
            publishedAt: string
        }
    },
    "meta": any
}

export interface BookingResponse{
    data: {
        id: number,
        attributes: {
            order: boolean,
            createdAt: string,
            updatedAt: string,
            publishedAt: string,
            dateOrder: string
        }
    },
    meta: any

}

export type ResponseStatusReq = 'error' | 'success';

export type AlertFounder = 'books' | 'profile' | 'comments' | 'booking' | 'categories'
