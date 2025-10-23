'use client';

import { useState } from 'react';

interface Job {
  id: number;
  status: 'pending' | 'running' | 'completed';
  progress: number;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [nextId, setNextId] = useState(1);

  const startJob = () => {
    const newJob: Job = { id: nextId, status: 'pending', progress: 0 };
    setJobs(prev => [...prev, newJob]);
    setNextId(prev => prev + 1);

    // Simulate job execution
    setTimeout(() => {
      setJobs(prev => prev.map(job =>
        job.id === newJob.id ? { ...job, status: 'running' } : job
      ));

      const interval = setInterval(() => {
        setJobs(prev => prev.map(job => {
          if (job.id === newJob.id) {
            const newProgress = job.progress + 10;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...job, progress: 100, status: 'completed' };
            }
            return { ...job, progress: newProgress };
          }
          return job;
        }));
      }, 500);
    }, 1000);
  };

  const clearCompleted = () => {
    setJobs(prev => prev.filter(job => job.status !== 'completed'));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <main className="w-full max-w-4xl bg-white dark:bg-black rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-zinc-50">
          Job Concurrency Demo
        </h1>
        <p className="text-lg text-center mb-8 text-zinc-600 dark:text-zinc-400">
          Simulate concurrent job execution with progress tracking.
        </p>
        <div className="text-center mb-8">
          <a
            href="/notes"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View GitHub Actions Documentation
          </a>
        </div>

        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={startJob}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Job
          </button>
          <button
            onClick={clearCompleted}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear Completed
          </button>
        </div>

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-center text-zinc-500">No jobs running. Click "Start New Job" to begin.</p>
          ) : (
            jobs.map(job => (
              <div key={job.id} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Job #{job.id}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    job.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    job.status === 'running' ? 'bg-blue-200 text-blue-800' :
                    'bg-green-200 text-green-800'
                  }`}>
                    {job.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${job.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  Progress: {job.progress}%
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
