/**
 * Report Generator Component
 * 
 * A comprehensive report generation system that allows users to create,
 * configure, and generate various types of reports with different data sources
 * and output formats.
 * 
 * Features:
 * - Multiple report types (Summary, Top N Records, Custom SQL)
 * - Real-time report preview
 * - Configurable parameters and filters
 * - Export capabilities (PDF, Excel, CSV)
 * - Scheduled report generation
 * - Template-based report creation
 * - Interactive data visualization
 * 
 * Libraries used:
 * - React: Component state and lifecycle management
 * - React Hook Form: Form validation and submission
 * - Tailwind CSS: Styling and responsive design
 * - Shadcn/UI: Form components and UI elements
 * - Toast notifications: User feedback
 * 
 * Use Cases:
 * - Business intelligence reporting
 * - Data analysis and insights
 * - Performance monitoring reports
 * - Financial summaries
 * - User activity reports
 * - Compliance and audit reports
 * 
 * @example
 * // Basic usage
 * <ReportGenerator
 *   onReportGenerate={(config) => generateReport(config)}
 *   dataSources={availableDataSources}
 * />
 * 
 * @example
 * // With custom templates
 * <ReportGenerator
 *   templates={reportTemplates}
 *   onReportGenerate={handleGenerate}
 *   onReportSave={handleSave}
 *   allowScheduling={true}
 * />
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  Calendar, 
  Settings, 
  Database,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from "lucide-react";

/**
 * Report Type Definitions
 * Defines available report types with their configurations
 */
export type ReportType = 
  | 'Simple Summary'
  | 'Top 10 Records'
  | 'Custom SQL'
  | 'Time Series Analysis'
  | 'Comparative Analysis'
  | 'User Activity Report'
  | 'Financial Summary'
  | 'Performance Metrics';

/**
 * Report Configuration Interface
 * Defines the structure of a report configuration
 * 
 * @interface ReportConfig
 * @property {string} name - Report name/title
 * @property {ReportType} type - Type of report to generate
 * @property {string} [description] - Report description
 * @property {Object} parameters - Report-specific parameters
 * @property {Object} [filters] - Data filtering options
 * @property {Object} [formatting] - Output formatting options
 * @property {Object} [scheduling] - Scheduling configuration
 */
export interface ReportConfig {
  name: string;
  type: ReportType;
  description?: string;
  parameters: {
    dataSource?: string;
    dateRange?: {
      start: string;
      end: string;
    };
    groupBy?: string[];
    aggregations?: string[];
    customQuery?: string;
    limit?: number;
  };
  filters?: {
    conditions: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
  };
  formatting?: {
    outputFormat: 'table' | 'chart' | 'pdf' | 'excel' | 'csv';
    chartType?: 'bar' | 'line' | 'pie' | 'area';
    includeCharts: boolean;
    includeRawData: boolean;
  };
  scheduling?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: string[];
  };
}

/**
 * Report Generator Props Interface
 * 
 * @interface ReportGeneratorProps
 * @property {function} onReportGenerate - Callback when report is generated
 * @property {function} [onReportSave] - Callback when report config is saved
 * @property {string[]} [dataSources] - Available data sources
 * @property {ReportConfig[]} [templates] - Pre-defined report templates
 * @property {boolean} [allowScheduling] - Whether scheduling is enabled
 * @property {boolean} [allowCustomSQL] - Whether custom SQL is allowed
 */
interface ReportGeneratorProps {
  onReportGenerate: (config: ReportConfig) => void;
  onReportSave?: (config: ReportConfig) => void;
  dataSources?: string[];
  templates?: ReportConfig[];
  allowScheduling?: boolean;
  allowCustomSQL?: boolean;
}

/**
 * Available report types with their configurations
 * Each type defines specific parameters and capabilities
 */
const REPORT_TYPES: Array<{
  type: ReportType;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  complexity: 'simple' | 'intermediate' | 'advanced';
}> = [
  {
    type: 'Simple Summary',
    label: 'Simple Summary',
    description: 'Basic aggregated data summary with key metrics',
    icon: FileText,
    category: 'Basic',
    complexity: 'simple'
  },
  {
    type: 'Top 10 Records',
    label: 'Top N Records',
    description: 'List of top performing records by specified criteria',
    icon: TrendingUp,
    category: 'Basic',
    complexity: 'simple'
  },
  {
    type: 'Time Series Analysis',
    label: 'Time Series Analysis',
    description: 'Trends and patterns over time periods',
    icon: BarChart3,
    category: 'Analytics',
    complexity: 'intermediate'
  },
  {
    type: 'User Activity Report',
    label: 'User Activity Report',
    description: 'User engagement and activity metrics',
    icon: Users,
    category: 'Analytics',
    complexity: 'intermediate'
  },
  {
    type: 'Financial Summary',
    label: 'Financial Summary',
    description: 'Revenue, costs, and financial performance metrics',
    icon: DollarSign,
    category: 'Business',
    complexity: 'intermediate'
  },
  {
    type: 'Performance Metrics',
    label: 'Performance Metrics',
    description: 'System and application performance indicators',
    icon: Activity,
    category: 'Technical',
    complexity: 'intermediate'
  },
  {
    type: 'Custom SQL',
    label: 'Custom SQL Query',
    description: 'Execute custom SQL queries for advanced reporting',
    icon: Database,
    category: 'Advanced',
    complexity: 'advanced'
  },
];

/**
 * Sample data for report preview
 * Used to demonstrate report output structure
 */
const SAMPLE_DATA = [
  {
    id: "001",
    name: "Alice Lee",
    email: "alice@email.com",
    joined: "2023-10-11",
    revenue: 15420,
    orders: 23,
    status: "Active"
  },
  {
    id: "002",
    name: "Bob Smith",
    email: "bob@email.com",
    joined: "2023-10-11",
    revenue: 8350,
    orders: 15,
    status: "Active"
  },
  {
    id: "003",
    name: "Carol White",
    email: "carol@email.com",
    joined: "2023-10-11",
    revenue: 22100,
    orders: 31,
    status: "Premium"
  },
  {
    id: "004",
    name: "David Johnson",
    email: "david@email.com",
    joined: "2023-09-15",
    revenue: 5200,
    orders: 8,
    status: "Active"
  },
];

/**
 * Report Generator Component
 * 
 * Main component for creating and generating reports.
 * Provides a comprehensive interface for report configuration and generation.
 * 
 * @param {ReportGeneratorProps} props - Component properties
 * @returns {JSX.Element} Report generator interface
 */
export default function ReportGenerator({
  onReportGenerate,
  onReportSave,
  dataSources = ['Users', 'Orders', 'Products', 'Analytics'],
  templates = [],
  allowScheduling = false,
  allowCustomSQL = true,
}: ReportGeneratorProps) {
  // Main report configuration state
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: '',
    type: 'Simple Summary',
    description: '',
    parameters: {
      dataSource: '',
      limit: 100,
    },
    formatting: {
      outputFormat: 'table',
      includeCharts: false,
      includeRawData: true,
    },
    scheduling: {
      enabled: false,
      frequency: 'weekly',
      time: '09:00',
      recipients: [],
    },
  });

  // UI state management
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [previewData, setPreviewData] = useState(SAMPLE_DATA);

  /**
   * Updates report configuration
   * Merges new configuration with existing state
   * 
   * @param {Partial<ReportConfig>} updates - Configuration updates
   */
  const updateConfig = (updates: Partial<ReportConfig>) => {
    setReportConfig(prev => ({
      ...prev,
      ...updates,
      parameters: {
        ...prev.parameters,
        ...(updates.parameters || {}),
      },
      formatting: {
        ...prev.formatting,
        ...(updates.formatting || {}),
      },
      scheduling: {
        ...prev.scheduling,
        ...(updates.scheduling || {}),
      },
    }));
  };

  /**
   * Applies a report template
   * Loads pre-configured report settings
   * 
   * @param {string} templateName - Name of template to apply
   */
  const applyTemplate = (templateName: string) => {
    const template = templates.find(t => t.name === templateName);
    if (template) {
      setReportConfig(template);
      setSelectedTemplate(templateName);
      toast({
        title: "Template Applied",
        description: `${templateName} template has been loaded.`,
      });
    }
  };

  /**
   * Validates report configuration
   * Checks for required fields and valid settings
   * 
   * @returns {boolean} Whether configuration is valid
   */
  const validateConfig = (): boolean => {
    if (!reportConfig.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Report name is required.",
        variant: "destructive",
      });
      return false;
    }

    if (!reportConfig.parameters.dataSource) {
      toast({
        title: "Validation Error",
        description: "Data source must be selected.",
        variant: "destructive",
      });
      return false;
    }

    if (reportConfig.type === 'Custom SQL' && !reportConfig.parameters.customQuery?.trim()) {
      toast({
        title: "Validation Error",
        description: "Custom SQL query is required for SQL reports.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  /**
   * Handles report generation
   * Validates configuration and triggers generation process
   * 
   * @param {React.FormEvent} e - Form submission event
   */
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateConfig()) return;

    setIsLoading(true);
    
    try {
      // Simulate report generation delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      onReportGenerate(reportConfig);
      
      toast({
        title: "Report Generated!",
        description: `${reportConfig.name} has been generated successfully.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles report configuration saving
   * Saves current configuration as a template
   */
  const handleSave = () => {
    if (!validateConfig()) return;

    if (onReportSave) {
      onReportSave(reportConfig);
      toast({
        title: "Report Saved",
        description: "Report configuration has been saved as a template.",
      });
    }
  };

  /**
   * Gets the current report type configuration
   * 
   * @returns {Object} Report type configuration object
   */
  const getCurrentReportType = () => {
    return REPORT_TYPES.find(rt => rt.type === reportConfig.type) || REPORT_TYPES[0];
  };

  /**
   * Renders the report type selector
   * Shows available report types with descriptions
   * 
   * @returns {JSX.Element} Report type selector component
   */
  const renderReportTypeSelector = () => (
    <div className="space-y-3">
      <Label htmlFor="reportType">Report Type</Label>
      <Select
        value={reportConfig.type}
        onValueChange={(value: ReportType) => updateConfig({ type: value })}
      >
        <SelectTrigger id="reportType">
          <SelectValue placeholder="Select report type" />
        </SelectTrigger>
        <SelectContent>
          {REPORT_TYPES.map((type) => {
            if (type.type === 'Custom SQL' && !allowCustomSQL) return null;
            
            return (
              <SelectItem key={type.type} value={type.type}>
                <div className="flex items-center gap-2">
                  <type.icon size={16} />
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-gray-500">{type.description}</div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );

  /**
   * Renders basic report configuration options
   * Shows essential settings for report generation
   * 
   * @returns {JSX.Element} Basic configuration component
   */
  const renderBasicConfiguration = () => (
    <div className="space-y-4">
      {/* Report Name */}
      <div>
        <Label htmlFor="reportName">Report Name</Label>
        <Input
          id="reportName"
          value={reportConfig.name}
          onChange={(e) => updateConfig({ name: e.target.value })}
          placeholder="e.g., Monthly Sales Report"
        />
      </div>

      {/* Report Description */}
      <div>
        <Label htmlFor="reportDescription">Description (Optional)</Label>
        <Textarea
          id="reportDescription"
          value={reportConfig.description || ''}
          onChange={(e) => updateConfig({ description: e.target.value })}
          placeholder="Brief description of this report..."
          rows={2}
        />
      </div>

      {/* Data Source */}
      <div>
        <Label htmlFor="dataSource">Data Source</Label>
        <Select
          value={reportConfig.parameters.dataSource || ''}
          onValueChange={(value) => updateConfig({ 
            parameters: { dataSource: value } 
          })}
        >
          <SelectTrigger id="dataSource">
            <SelectValue placeholder="Select data source" />
          </SelectTrigger>
          <SelectContent>
            {dataSources.map(source => (
              <SelectItem key={source} value={source}>
                <div className="flex items-center gap-2">
                  <Database size={14} />
                  {source}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Record Limit */}
      {reportConfig.type !== 'Custom SQL' && (
        <div>
          <Label htmlFor="recordLimit">Record Limit</Label>
          <Input
            id="recordLimit"
            type="number"
            value={reportConfig.parameters.limit || 100}
            onChange={(e) => updateConfig({ 
              parameters: { limit: parseInt(e.target.value) || 100 } 
            })}
            min="1"
            max="10000"
          />
        </div>
      )}

      {/* Custom SQL Query */}
      {reportConfig.type === 'Custom SQL' && allowCustomSQL && (
        <div>
          <Label htmlFor="customQuery">SQL Query</Label>
          <Textarea
            id="customQuery"
            value={reportConfig.parameters.customQuery || ''}
            onChange={(e) => updateConfig({ 
              parameters: { customQuery: e.target.value } 
            })}
            placeholder="SELECT * FROM users WHERE..."
            rows={4}
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Write your SQL query. Be careful with data access permissions.
          </p>
        </div>
      )}
    </div>
  );

  /**
   * Renders the report preview table
   * Shows sample data to demonstrate report structure
   * 
   * @returns {JSX.Element} Report preview component
   */
  const renderReportPreview = () => (
    <div className="rounded-xl border shadow-sm p-6 bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Report Preview</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FileText size={16} />
          <span>{reportConfig.type}</span>
        </div>
      </div>
      
      {/* Sample Data Table */}
      <div className="overflow-auto">
        <table className="min-w-full border bg-white rounded">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border-b text-left font-medium">User ID</th>
              <th className="px-4 py-2 border-b text-left font-medium">Name</th>
              <th className="px-4 py-2 border-b text-left font-medium">Email</th>
              <th className="px-4 py-2 border-b text-left font-medium">Joined</th>
              <th className="px-4 py-2 border-b text-left font-medium">Revenue</th>
              <th className="px-4 py-2 border-b text-left font-medium">Orders</th>
              <th className="px-4 py-2 border-b text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {previewData.slice(0, reportConfig.parameters.limit || 100).map((row, index) => (
              <tr key={row.id} className="hover:bg-muted/30">
                <td className="px-4 py-2 border-b">{row.id}</td>
                <td className="px-4 py-2 border-b">{row.name}</td>
                <td className="px-4 py-2 border-b">{row.email}</td>
                <td className="px-4 py-2 border-b">{row.joined}</td>
                <td className="px-4 py-2 border-b">${row.revenue.toLocaleString()}</td>
                <td className="px-4 py-2 border-b">{row.orders}</td>
                <td className="px-4 py-2 border-b">
                  <span className={`px-2 py-1 rounded text-xs ${
                    row.status === 'Premium' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Preview Footer */}
      <div className="mt-4 text-xs text-gray-500 flex justify-between">
        <span>Sample data - actual report will use live data</span>
        <span>Showing {Math.min(previewData.length, reportConfig.parameters.limit || 100)} records</span>
      </div>
    </div>
  );

  // Main component render
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Report Generator</h2>
          <p className="text-gray-600">Create and customize data reports</p>
        </div>
        
        {/* Template Selector */}
        {templates.length > 0 && (
          <div className="flex items-center gap-2">
            <Label htmlFor="template">Template:</Label>
            <Select
              value={selectedTemplate}
              onValueChange={applyTemplate}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Choose template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.name} value={template.name}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Configuration Form */}
      <form onSubmit={handleGenerate} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Report Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">Report Configuration</h3>
              
              {renderReportTypeSelector()}
              {renderBasicConfiguration()}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Generating..." : "Generate Report"}
                </Button>
                
                {onReportSave && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>

            {/* Advanced Options */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <button
                type="button"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-semibold">Advanced Options</h3>
                <Settings size={16} />
              </button>
              
              {showAdvancedOptions && (
                <div className="mt-4 space-y-4">
                  {/* Output Format */}
                  <div>
                    <Label>Output Format</Label>
                    <Select
                      value={reportConfig.formatting?.outputFormat || 'table'}
                      onValueChange={(value: any) => updateConfig({
                        formatting: { 
                          ...reportConfig.formatting,
                          outputFormat: value 
                        }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="table">Table View</SelectItem>
                        <SelectItem value="chart">Chart View</SelectItem>
                        <SelectItem value="pdf">PDF Export</SelectItem>
                        <SelectItem value="excel">Excel Export</SelectItem>
                        <SelectItem value="csv">CSV Export</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Scheduling */}
                  {allowScheduling && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="enableScheduling"
                          checked={reportConfig.scheduling?.enabled || false}
                          onChange={(e) => updateConfig({
                            scheduling: { 
                              ...reportConfig.scheduling,
                              enabled: e.target.checked 
                            }
                          })}
                        />
                        <Label htmlFor="enableScheduling">Enable Scheduling</Label>
                      </div>
                      
                      {reportConfig.scheduling?.enabled && (
                        <div className="space-y-2 pl-6">
                          <Select
                            value={reportConfig.scheduling.frequency}
                            onValueChange={(value: any) => updateConfig({
                              scheduling: { 
                                ...reportConfig.scheduling,
                                frequency: value 
                              }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Input
                            type="time"
                            value={reportConfig.scheduling.time}
                            onChange={(e) => updateConfig({
                              scheduling: { 
                                ...reportConfig.scheduling,
                                time: e.target.value 
                              }
                            })}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Report Preview */}
          <div className="lg:col-span-2">
            {renderReportPreview()}
          </div>
        </div>
      </form>
    </div>
  );
}

/**
 * Component Usage Guidelines:
 * 
 * 1. Basic Report Generation:
 *    - Select report type and data source
 *    - Configure basic parameters
 *    - Generate report with default settings
 * 
 * 2. Advanced Configuration:
 *    - Use custom SQL for complex queries
 *    - Configure output formats and scheduling
 *    - Apply filters and aggregations
 * 
 * 3. Template Management:
 *    - Save frequently used configurations as templates
 *    - Apply templates for quick report generation
 *    - Share templates across team members
 * 
 * 4. Performance Considerations:
 *    - Set appropriate record limits for large datasets
 *    - Use preview mode to validate report structure
 *    - Consider data source performance implications
 * 
 * 5. Security Notes:
 *    - Custom SQL queries should be validated
 *    - Implement proper data access controls
 *    - Sanitize user inputs for SQL injection prevention
 */
