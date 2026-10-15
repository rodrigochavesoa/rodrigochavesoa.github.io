/**
 * Últimas postagens do LinkedIn.
 * Preencha só com posts reais. Com a lista vazia, a seção não é renderizada.
 * image: caminho em public/, por exemplo "/posts/exemplo.jpg".
 * date: AAAA-MM-DD.
 */
export type LinkedInPost = {
  title: string;
  resumo: string;
  date: string;
  url: string;
  image?: string;
};

export const linkedInPosts: LinkedInPost[] = [];
