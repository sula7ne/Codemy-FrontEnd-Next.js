interface MonacoEnvironment {
  getWorker(workerId: string, label: string): Worker;
}

interface Window {
  MonacoEnvironment: MonacoEnvironment;
}

interface WorkerGlobalScope {
  MonacoEnvironment: MonacoEnvironment;
}