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
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'setup', // Project setup
        'config', // Configuration files
        'deps', // Dependency updates
        'feature', // Feature-specific changes
        'bug', // Bug fixes
        'docs', // Documentation
        'style', // Code style/formatting
        'refactor', // Code refactoring
        'test', // Tests
        'build', // Build scripts or configuration
        'ci', // Continuous integration
        'release', // Release related changes
        'other', // Other changes
      ],
    ],
    'body-full-stop': [2, 'always', '.'],
    'body-max-length': [2, 'always', 150],
  },
  prompt: {
    messages: {
      skip: 'Skipping this one!',
      max: 'Keep it under %d characters, please!',
      min: 'At least %d characters needed!',
      emptyWarning: 'Oops, you forgot to fill this in!',
      upperLimitWarning: 'Whoa, that’s too long!',
      lowerLimitWarning: 'Hmm, that’s too short!',
    },
    questions: {
      type: {
        description: 'What kind of change are you committing?',
        enum: {
          feat: {
            description: 'Adding something cool and new!',
            title: 'Features',
            emoji: '✨', 
          },
          fix: {
            description: 'Squashing a bug',
            title: 'Bug Fixes',
            emoji: '🐛', 
          },
          docs: {
            description: 'Updating the docs',
            title: 'Documentation',
            emoji: '📚', 
          },
          style: {
            description: 'Tweaking styles (no code changes)',
            title: 'Styles',
            emoji: '🎨', 
          },
          refactor: {
            description: 'Cleaning up the code without changing functionality',
            title: 'Code Refactoring',
            emoji: '♻️', 
          },
          perf: {
            description: 'Making things faster',
            title: 'Performance Improvements',
            emoji: '⚡️', 
          },
          test: {
            description: 'Writing or fixing tests',
            title: 'Tests',
            emoji: '✅', 
          },
          build: {
            description: 'Changing the build setup',
            title: 'Builds',
            emoji: '🔧', 
          },
          ci: {
            description: 'Updating CI config',
            title: 'Continuous Integrations',
            emoji: '👷', 
          },
          chore: {
            description: 'General maintenance tasks',
            title: 'Chores',
            emoji: '🔨', 
          },
          revert: {
            description: 'Undoing a previous commit',
            title: 'Reverts',
            emoji: '⏪', 
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
