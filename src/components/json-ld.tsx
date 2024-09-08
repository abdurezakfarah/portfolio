import { type Thing, type WithContext } from 'schema-dts';

export function JsonLd<T extends Thing>({ jsonLd }: { jsonLd: WithContext<T> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
