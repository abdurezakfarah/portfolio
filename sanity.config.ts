'use client';

import { Logo } from '@/components/logo';
import { siteConfig } from '@/configuration/site';
import { singletons, unMutableActions } from '@/sanity/constants';
import { structure } from '@/sanity/structurre';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { theme } from 'https://themer.sanity.build/api/hues?primary=915eff';
import { defineConfig } from 'sanity';
import { iconify } from 'sanity-plugin-iconify';
import { media } from 'sanity-plugin-media';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { structureTool } from 'sanity/structure';
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schema } from './src/sanity/schemas';

export default defineConfig({
  basePath: '/admin',
  title: siteConfig.name,
  theme,
  icon: Logo,
  projectId,
  dataset,
  schema,
  document: {
    actions: (prev, context) => {
      const isHomePage = context.schemaType === 'page' && context.documentId == 'HOME';
      const isSingleton = singletons.has(context.schemaType);
      return isHomePage || isSingleton
        ? prev.filter(({ action }) => action && unMutableActions.has(action))
        : prev;
    },
  },
  plugins: [
    structureTool({
      structure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    simplerColorInput(),
    media(),
    iconify(),
    codeInput(),
  ],
});
