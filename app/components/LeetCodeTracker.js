// app/components/LeetCodeTracker.js
'use client'; // This must be a Client Component to use hooks and localStorage

import React, { useState, useEffect } from 'react';

// A comprehensive list of LeetCode problems
const leetCodeProblems = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/two-sum/' },
  { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-parentheses/' },
  { id: 3, title: 'Merge Two Sorted Lists', difficulty: 'Easy', link: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
  { id: 4, title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
  { id: 5, title: 'Valid Palindrome', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-palindrome/' },
  { id: 6, title: 'Invert Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/invert-binary-tree/' },
  { id: 7, title: 'Valid Anagram', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-anagram/' },
  { id: 8, title: 'Binary Search', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-search/' },
  { id: 9, title: 'Linked List Cycle', difficulty: 'Easy', link: 'https://leetcode.com/problems/linked-list-cycle/' },
  { id: 10, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
  { id: 11, title: 'Single Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/single-number/' },
  { id: 12, title: 'Reverse Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-linked-list/' },
  { id: 13, title: 'Majority Element', difficulty: 'Easy', link: 'https://leetcode.com/problems/majority-element/' },
  { id: 14, title: 'Missing Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/missing-number/' },
  { id: 15, title: 'Reverse String', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-string/' },
  { id: 16, title: 'Diameter of Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
  { id: 17, title: 'Middle of the Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
  { id: 18, title: 'Convert Sorted Array to Binary Search Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/' },
  { id: 19, title: 'Maximum Subarray', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-subarray/' },
  { id: 20, title: 'Climbing Stairs', difficulty: 'Easy', link: 'https://leetcode.com/problems/climbing-stairs/' },
  { id: 21, title: 'Symmetric Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/symmetric-tree/' },
  { id: 22, title: 'Contains Duplicate', difficulty: 'Easy', link: 'https://leetcode.com/problems/contains-duplicate/' },
  { id: 23, title: 'Merge Sorted Array', difficulty: 'Easy', link: 'https://leetcode.com/problems/merge-sorted-array/' },
  { id: 24, title: 'Remove Element', difficulty: 'Easy', link: 'https://leetcode.com/problems/remove-element/' },
  { id: 25, title: 'Palindrome Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/palindrome-number/' },
  { id: 26, title: 'Plus One', difficulty: 'Easy', link: 'https://leetcode.com/problems/plus-one/' },
  { id: 27, title: 'Sqrt(x)', difficulty: 'Easy', link: 'https://leetcode.com/problems/sqrtx/' },
  { id: 28, title: 'Path Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/path-sum/' },
  { id: 29, title: 'Minimum Absolute Difference in BST', difficulty: 'Easy', link: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/' },
  { id: 30, title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
  { id: 31, title: 'Add Two Numbers', difficulty: 'Medium', link: 'https://leetcode.com/problems/add-two-numbers/' },
  { id: 32, title: 'Product of Array Except Self', difficulty: 'Medium', link: 'https://leetcode.com/problems/product-of-array-except-self/' },
  { id: 33, title: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/' },
  { id: 34, title: 'House Robber', difficulty: 'Medium', link: 'https://leetcode.com/problems/house-robber/' },
  { id: 35, title: 'Number of 1 Bits', difficulty: 'Easy', link: 'https://leetcode.com/problems/number-of-1-bits/' },
  { id: 36, title: 'Validate Binary Search Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/validate-binary-search-tree/' },
  { id: 37, title: 'Min Stack', difficulty: 'Medium', link: 'https://leetcode.com/problems/min-stack/' },
  { id: 38, title: 'Kth Smallest Element in a BST', difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
  { id: 39, title: 'Merge Intervals', difficulty: 'Medium', link: 'https://leetcode.com/problems/merge-intervals/' },
  { id: 40, title: 'Set Matrix Zeroes', difficulty: 'Medium', link: 'https://leetcode.com/problems/set-matrix-zeroes/' },
  { id: 41, title: 'Spiral Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/spiral-matrix/' },
  { id: 42, title: '3Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/3sum/' },
  { id: 43, title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },
  { id: 44, title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/' },
  { id: 45, title: 'Container With Most Water', difficulty: 'Medium', link: 'https://leetcode.com/problems/container-with-most-water/' },
  { id: 46, title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', link: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/' },
  { id: 47, title: 'Group Anagrams', difficulty: 'Medium', link: 'https://leetcode.com/problems/group-anagrams/' },
  { id: 48, title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
  { id: 49, title: 'Kth Largest Element in an Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  { id: 50, title: 'Longest Palindromic Substring', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-substring/' },
  { id: 51, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
  { id: 52, title: 'Maximal Square', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximal-square/' },
  { id: 53, title: 'Maximum Product Subarray', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-product-subarray/' },
  { id: 54, title: 'Number of Islands', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-islands/' },
  { id: 55, title: 'Permutations', difficulty: 'Medium', link: 'https://leetcode.com/problems/permutations/' },
  { id: 56, title: 'Remove Nth Node From End of List', difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
  { id: 57, title: 'Rotate Image', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotate-image/' },
  { id: 58, title: 'Search a 2D Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-a-2d-matrix/' },
  { id: 59, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
  { id: 60, title: 'Subsets', difficulty: 'Medium', link: 'https://leetcode.com/problems/subsets/' },
  { id: 61, title: 'Top K Frequent Elements', difficulty: 'Medium', link: 'https://leetcode.com/problems/top-k-frequent-elements/' },
  { id: 62, title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
  { id: 63, title: 'Unique Paths', difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-paths/' },
  { id: 64, title: 'Valid Sudoku', difficulty: 'Medium', link: 'https://leetcode.com/problems/valid-sudoku/' },
  { id: 65, title: 'Word Break', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-break/' },
  { id: 66, title: 'Word Search', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-search/' },
  { id: 67, title: 'Coin Change', difficulty: 'Medium', link: 'https://leetcode.com/problems/coin-change/' },
  { id: 68, title: 'Combination Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/combination-sum/' },
  { id: 69, title: 'Copy List with Random Pointer', difficulty: 'Medium', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
  { id: 70, title: 'Course Schedule', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule/' },
  { id: 71, title: 'Design Add and Search Words Data Structure', difficulty: 'Medium', link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
  { id: 72, title: 'Game of Life', difficulty: 'Medium', link: 'https://leetcode.com/problems/game-of-life/' },
  { id: 73, title: 'Jump Game', difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game/' },
  { id: 74, title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/' },
  { id: 75, title: 'Longest Consecutive Sequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
  { id: 76, title: 'Longest Increasing Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
  { id: 77, title: 'Minimum Path Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-path-sum/' },
  { id: 78, title: 'Course Schedule II', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule-ii/' },
  { id: 79, title: 'Rotate Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotate-array/' },
  { id: 80, title: 'Bitwise AND of Numbers Range', difficulty: 'Medium', link: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/' },
  { id: 81, title: 'Pow(x, n)', difficulty: 'Medium', link: 'https://leetcode.com/problems/powx-n/' },
  { id: 82, title: 'Construct Binary Tree from Inorder and Postorder Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/' },
  { id: 83, title: 'Binary Tree Right Side View', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
  { id: 84, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
  { id: 85, title: 'Surrounded Regions', difficulty: 'Medium', link: 'https://leetcode.com/problems/surrounded-regions/' },
  { id: 86, title: 'Clone Graph', difficulty: 'Medium', link: 'https://leetcode.com/problems/clone-graph/' },
  { id: 87, title: 'Evaluate Division', difficulty: 'Medium', link: 'https://leetcode.com/problems/evaluate-division/' },
  { id: 88, title: 'Generate Parentheses', difficulty: 'Medium', link: 'https://leetcode.com/problems/generate-parentheses/' },
  { id: 89, title: 'Sort List', difficulty: 'Medium', link: 'https://leetcode.com/problems/sort-list/' },
  { id: 90, title: 'Maximum Sum Circular Subarray', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-sum-circular-subarray/' },
  { id: 91, title: 'Find Peak Element', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-peak-element/' },
  { id: 92, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
  { id: 93, title: 'Trapping Rain Water', difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water/' },
  { id: 94, title: 'Minimum Window Substring', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-substring/' },
  { id: 95, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
  { id: 96, title: 'Basic Calculator', difficulty: 'Hard', link: 'https://leetcode.com/problems/basic-calculator/' },
  { id: 97, title: 'Find Median from Data Stream', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-median-from-data-stream/' },
  { id: 98, title: 'Merge k Sorted Lists', difficulty: 'Hard', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
  { id: 99, title: 'Word Search II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-search-ii/' },
  { id: 100, title: 'Reverse Nodes in k-Group', difficulty: 'Hard', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
];

const difficultyStyles = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

const LOCAL_STORAGE_KEY = 'leetCodeProgress';

export default function LeetCodeTracker() {
  const [problems, setProblems] = useState([]);

  // Effect to load data from localStorage on initial component mount
  useEffect(() => {
    // Check if localStorage is available (it's not available during server-side rendering)
    if (typeof window !== 'undefined') {
      const savedProgressJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
      const savedProgress = savedProgressJSON ? JSON.parse(savedProgressJSON) : {};

      const initialProblems = leetCodeProblems.map(problem => ({
        ...problem,
        completed: savedProgress[problem.id] || false,
      }));
      setProblems(initialProblems);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Effect to save data to localStorage whenever the problems state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && problems.length > 0) {
      const progressToSave = problems.reduce((acc, problem) => {
        if (problem.completed) {
          acc[problem.id] = true;
        }
        return acc;
      }, {});
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progressToSave));
    }
  }, [problems]); // This effect runs whenever the 'problems' array changes

  const handleToggleComplete = (problemId) => {
    setProblems(currentProblems =>
      currentProblems.map(problem =>
        problem.id === problemId
          ? { ...problem, completed: !problem.completed }
          : problem
      )
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          LeetCode Problem Tracker
        </h1>
        <ul className="divide-y divide-gray-200">
          {problems.map(problem => (
            <li key={problem.id} className="flex items-center gap-4 py-4">
              <input
                type="checkbox"
                checked={problem.completed}
                onChange={() => handleToggleComplete(problem.id)}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <a
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-grow text-lg font-medium text-gray-700 transition-colors hover:text-blue-600 ${
                  problem.completed ? 'line-through text-gray-400' : ''
                }`}
              >
                {problem.title}
              </a>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  difficultyStyles[problem.difficulty]
                }`}
              >
                {problem.difficulty}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}