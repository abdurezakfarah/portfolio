import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation changes
        'style', // Changes that do not affect the meaning of the code (white-space, formatting, etc.)
        'refactor', // Code changes that neither fix a bug nor add a feature
        'perf', // Performance improvement
        'test', // Adding missing tests or correcting existing tests
        'build', // Changes that affect the build system or external dependencies (example scopes: npm)
        'ci', // Changes to CI configuration files and scripts
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
        'remove',
      ],
    ],
  },
  prompt: {
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      type: {
        description: 'What kind of change are you committing?',
        enum: {
          feat: {
            description: 'Introducing a new feature or functionality.',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Fixing a bug or issue in the code.',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Updating or adding documentation.',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description:
              'Changes that do not affect functionality (e.g., formatting, white-space).',
            title: 'Styles',
            emoji: '🎨',
          },
          refactor: {
            description: 'Restructuring the code without changing its behavior.',
            title: 'Code Refactoring',
            emoji: '♻️',
          },
          perf: {
            description: 'Improving the performance of the code.',
            title: 'Performance Improvements',
            emoji: '⚡️',
          },
          test: {
            description: 'Adding or modifying tests.',
            title: 'Tests',
            emoji: '✅',
          },
          build: {
            description: 'Modifying the build configuration or tools.',
            title: 'Builds',
            emoji: '🔧',
          },
          ci: {
            description: 'Updating CI configuration files and scripts.',
            title: 'Continuous Integration',
            emoji: '👷',
          },
          chore: {
            description: 'Other changes that do not modify source or test files.',
            title: 'Chores',
            emoji: '🔨',
          },
          revert: {
            description: 'Reverting a previous commit.',
            title: 'Reverts',
            emoji: '⏪',
          },
          remove: {
            description: 'Removing code or files.',
            title: 'Remove',
            emoji: '🔥',
          },
        },
      },
      scope: {
        description:
          'What part of the project does this change affect (e.g. file or component name)?',
      },
      subject: {
        description: 'Give a brief summary of the change (in command form)!',
      },
      body: {
        description: 'Got more details? Let’s hear them!',
      },
      isBreaking: {
        description: 'Any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE needs a bit more detail. Describe what’s breaking here!',
      },
      breaking: {
        description: 'Tell us what exactly is breaking.',
      },
      isIssueAffected: {
        description: 'Does this change fix or affect any issues?',
      },
      issuesBody: {
        description: 'If this change resolves an issue, tell us how!',
      },
      issues: {
        description: 'Link any relevant issue numbers (e.g., "fix #123", "re #456")',
      },
    },
  },
};

export default Configuration;
