export interface ILink {
    href: string;
    prompt: string;
    render: string;
  }
  
  export interface IItem {
    data: {
      center: string;
      date_created: string;
      description_508: string;
      description: string;
      keywords: string[];
      media_type: string;
      nasa_id: string;
      title: string;
      location: string;
      photographer: string;
    }[];
    href: string;
    links: {
      href: string;
      rel: string;
      render: string;
    }[];
  }
  
  export interface IResponse {
    data: {
      collection: {
        items: IItem[];
        href: string;
        links: ILink[];
      };
    };
  }