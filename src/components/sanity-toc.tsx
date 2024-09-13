'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shadcn/accordion';
import { useLg } from '@/hooks/use-lg';
import { cn } from '@/lib/utilities/cn';
import { slugify } from '@/lib/utilities/slugify';
import { PostPageQueryResult } from '@/sanity/sanity.types';
import Link from 'next/link';

// Define the type for the Table of Contents (ToC)
type Headings = NonNullable<PostPageQueryResult>['headings'];

// Define the type for each node in the tree structure
type TreeNode = {
  text: string;
  slug: string;
  children?: TreeNode[];
};

/**
 * Transforms a flat array of blocks into a nested hierarchical tree structure.
 *
 * This function processes a list of heading blocks, organizing them into a tree structure
 * where each node can have multiple children based on their heading levels. The result is
 * a hierarchical representation of the document's table of contents.
 *
 * Algorithm:
 * 1. Initialize an empty array for the top-level nodes (treeNodes).
 * 2. Initialize an empty stack to keep track of current nodes and their levels.
 * 3. Iterate over each block:
 *    - Extract the heading level from the block's style.
 *    - Create a new tree node with the heading's text and level.
 *    - Adjust the stack to maintain the correct hierarchy:
 *      - Pop nodes from the stack while the top node's level is greater than or equal to the current level.
 *    - Determine the parent node from the top of the stack (if available).
 *    - Add the new node to the parent node's children or to the top-level nodes if no parent node exists.
 *    - Push the new node and its level onto the stack for future nesting.
 * 4. Return the array of top-level nodes.
 *
 * @param blocks - The flat list of heading blocks to transform.
 * @returns - A nested list of tree nodes representing the hierarchical structure.
 */
export function nestHeadings(blocks: Headings): TreeNode[] {
  // Array to hold the top-level nodes of the tree
  const treeNodes: TreeNode[] = [];

  // Stack to maintain the current path of nodes and their levels
  const stack: { node: TreeNode; level: number }[] = [];

  // Iterate over each block to build the tree structure
  blocks.forEach((block) => {
    // Skip blocks without style or children
    if (!block.style || !block.children) return;

    // Extract heading level from block style (e.g., 'h2' -> 2)
    const level = parseInt(block.style.replace('h', ''), 10);

    // Extract heading text from block children
    const text = block.children.map((child) => child.text || '').join(' ') || 'Untitled';

    // Create a new tree node for the current heading
    const treeNode: TreeNode = {
      slug: slugify(text),
      text,
      children: [],
    };

    // Adjust the stack to ensure the correct hierarchy
    while (stack.length > 0) {
      const topStack = stack[stack.length - 1];

      // If the top node's level is less than the current level, stop popping
      if (topStack && topStack.level < level) break;

      // Remove the top node from the stack if it does not fit the current level
      stack.pop();
    }

    // Determine the parent node from the stack (if any)
    if (stack.length > 0) {
      const parentNode = stack[stack.length - 1]?.node;
      if (parentNode && !parentNode.children) {
        // Ensure the parent node has a children array
        parentNode.children = [];
      }
      // Add the new node to the parent node's children
      parentNode?.children?.push(treeNode);
    } else {
      // If no parent node, add the new node as a top-level node
      treeNodes.push(treeNode);
    }

    // Push the new node and its level onto the stack for future nesting
    stack.push({ node: treeNode, level });
  });

  // Return the top-level nodes of the tree
  return treeNodes;
}

export function RenderToc({
  elements,
  level = 1,
}: {
  elements: TreeNode[];
  level?: number;
}) {
  return (
    <ul
      className={cn('space-y-2 text-sm font-semibold', {
        'ml-4 list-disc space-y-1 font-normal': level > 1,
        'space-y-3.5': level === 1,
      })}
    >
      {elements.map((el) => (
        <li
          key={el.text}
          className={cn({
            '[&:first-child]:mt-2': level > 1,
          })}
        >
          <Link href={`#${el.slug}`} className="hover:underline hover:underline-offset-4">
            {el.text}
          </Link>
          {el.children && <RenderToc elements={el.children} level={level + 1} />}
        </li>
      ))}
    </ul>
  );
}

export function Toc({ headings, title }: { headings: Headings; title?: string }) {
  const isLg = useLg();
  return (
    <section className="flex max-w-sm flex-col max-lg:my-10">
      <Accordion
        type="single"
        collapsible
        className="w-full bg-black-100"
        value={isLg ? 'toc-content' : undefined}
      >
        <AccordionItem value="toc-content" className="border-none">
          <AccordionTrigger className="rounded-lg border px-4 hover:no-underline">
            {title ?? 'Content'}
          </AccordionTrigger>
          <AccordionContent className="rounded-b-lg px-4 pb-8 pt-4">
            <nav className="flex gap-4">
              <RenderToc elements={nestHeadings(headings)} />
            </nav>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
