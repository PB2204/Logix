'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Trash2, AlertTriangle, RefreshCw, Download } from 'lucide-react';

interface FileAnalysis {
  filePath: string;
  imports: string[];
  exports: string[];
  isImported: boolean;
  unusedExports: string[];
}

interface UnusedCodeReport {
  unusedFiles: string[];
  filesWithUnusedExports: FileAnalysis[];
  totalFiles: number;
  totalUnusedFiles: number;
  totalUnusedExports: number;
}

export default function CodeAnalysisPage() {
  const [report, setReport] = useState<UnusedCodeReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      // that runs the analysis script on the server
      const response = await fetch('/api/analyze-code', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to run analysis');
      }
      
      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;
    
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unused-code-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Code Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Detect unused files and exports in your codebase to optimize your project
          </p>
        </div>

        <div className="mb-6">
          <Button onClick={runAnalysis} disabled={isLoading} className="mr-4">
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Run Analysis
              </>
            )}
          </Button>
          
          {report && (
            <Button variant="outline" onClick={downloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          )}
        </div>

        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center text-destructive">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {report && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{report.totalFiles}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unused Files</CardTitle>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{report.totalUnusedFiles}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unused Exports</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{report.totalUnusedExports}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Optimization Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {((report.totalUnusedFiles / report.totalFiles) * 100).toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Unused Files */}
            {report.unusedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trash2 className="mr-2 h-5 w-5 text-destructive" />
                    Unused Files ({report.unusedFiles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {report.unusedFiles.map((file, index) => (
                      <Badge key={index} variant="destructive" className="justify-start">
                        {file}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Files with Unused Exports */}
            {report.filesWithUnusedExports.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
                    Files with Unused Exports ({report.filesWithUnusedExports.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {report.filesWithUnusedExports.map((file, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{file.filePath}</h4>
                        <div className="flex flex-wrap gap-2">
                          {file.unusedExports.map((exportName, exportIndex) => (
                            <Badge key={exportIndex} variant="outline">
                              {exportName}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Review Before Removing</h4>
                      <p className="text-sm text-muted-foreground">
                        Always review findings carefully. Some code might be used dynamically or intended for future use.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">UI Components</h4>
                      <p className="text-sm text-muted-foreground">
                        Many UI components might be part of a design system and could be used in future features.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <RefreshCw className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Regular Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Run this analysis regularly during development to keep your codebase clean.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}