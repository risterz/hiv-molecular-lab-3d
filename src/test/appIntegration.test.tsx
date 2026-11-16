import { describe, it, expect } from 'vitest';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

describe('App Integration & Quiz Data', () => {
  it('loads 8 comprehensive quiz questions with valid keys and scientific citations', () => {
    expect(QUIZ_QUESTIONS.length).toBe(8);

    QUIZ_QUESTIONS.forEach((q) => {
      expect(q.id).toBeGreaterThan(0);
      expect(q.question.length).toBeGreaterThan(15);
      expect(q.options.length).toBe(4);
      expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswerIndex).toBeLessThan(4);
      expect(q.explanation.length).toBeGreaterThan(20);
      expect(q.scientificReference.length).toBeGreaterThan(5);
    });
  });

  it('verifies that each question option is distinct and non-empty', () => {
    QUIZ_QUESTIONS.forEach((q) => {
      const uniqueOptions = new Set(q.options);
      expect(uniqueOptions.size).toBe(4);
      q.options.forEach((opt) => expect(opt.trim().length).toBeGreaterThan(0));
    });
  });
});
