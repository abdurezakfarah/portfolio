import { groq } from 'next-sanity';

export const pageQuery = groq`
 *[_type == "page" && slug.current == $slug][0]{
   ...,
   content[] {
      ...,
     _type == "experience" => {
      ...,
      experience[]->
     },
     _type == "skills" => {
      ...,
      skills[] {
        ...,
        technologies[]{
          ...,
          "icon": icon.asset->url
        }
      }
     },
     _type == "projectBlock" => {
        ...,
        projects[]->{
          ...,
          image {
            ...,
            asset->
          }
        }
     },
     _type == "testimonials" => {
        ...,
        testimonials[]-> {
          ...,
          image {
            ...,
            asset->
          }
        }
     }
   }
 }
`;

export const postPageQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "ogImage": ogImage.asset->url,
    showOg,
    publishedAt,
    excerpt,
    body,
    category-> {
      name,
      "slug": slug.current
    },
    tags[]->{
      "slug": slug.current,
      name
    },
    author->{
      name,
      twitter,
      "image": image.asset->url,
      "slug": slug.current
    },
    "plainText": pt::text(body),
    "keywords": string::split(keywords, ","),
    _updatedAt,
    
   "headings": body[style in ["h2"]],
    
    "relatedPosts": *[
      _type == "post"
      && _id != ^._id 
      && count(tags[@._ref in ^.^.tags[]._ref]) > 0
    ][0..5]{
      title,
      "slug": slug.current,
      "ogImage": ogImage.asset->url,
      publishedAt,
      "plainText": pt::text(body)
    },
    "recentPosts": *[
      _type == "post" 
      && _id != ^._id
      && !(_id in *[
          _type == "post"
          && _id != ^.^._id 
          && count(tags[@._ref in ^.^.^.tags[]._ref]) > 0
        ]._id)
      ] | order(publishedAt desc)[0..5]{
      title,
      "slug": slug.current,
      "ogImage": ogImage.asset->url,
      publishedAt,
      "plainText": pt::text(body)
    }
  }
  `;

export const blogPageQuery = groq`
  *[_type == "post"][0..20] | order(publishedAt desc){
    _id,
    "slug": slug.current,
    title,
    "image": ogImage.asset->url,
    excerpt,
    "plainText": pt::text(body),
    publishedAt
  }
`;

export const postsQuery = groq`
  *[_type == "post"]{
    title, 
    "slug": slug.current, 
    excerpt,
    _updatedAt
  }
`;
