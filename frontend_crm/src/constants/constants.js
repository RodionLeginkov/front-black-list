// eslint-disable-next-line import/prefer-default-export
export const stackList = [
  'GraphQl',
  'postgreSQL',
  'Express',
  'React',
  'MongoDb',
  'Angular',
  'AWS',
  'Node',
];

export const userTableCells = [
  { label: 'Name', value: 'Name' },
  { label: 'Current Task', value: 'current_task' },
  { label: 'Current project', value: '' },
  { label: 'Role in the project', value: '' },
  { label: 'Current rate', value: '' },
  { label: 'Load(h/week)', value: '' },
  { label: 'Total Load', value: 'Loads' },
  { label: 'Role', value: 'Role' },
  { label: 'Project Ready', value: 'project_ready' },
  { label: 'Seniority', value: 'Senioiry' },
  { label: 'English Skill', value: 'english_skill' },
];

export const userRoles = [
  { label: 'CEO', value: 'ceo' },
  { label: 'CTO', value: 'cto' },
  { label: 'Sales Manager', value: 'sales_manager' },
  { label: 'Office Manager', value: 'office_manager' },
  { label: 'HR Manager', value: 'hr_manager' },
  { label: 'Team Leader', value: 'team_leader' },
  { label: 'Junior Developer', value: 'junior_developer' },
  { label: 'Middle Developer', value: 'middle_developer' },
  { label: 'Senior Developer', value: 'senior_developer' },
  { label: 'Intern', value: 'intern' },
];
export const englishLevels = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Elementary', value: 'elementary' },
  { label: 'Pre-intermediate', value: 'pre_intermediate' },
  { label: 'Low Intermediate', value: 'low_intermediate' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Upper Intermediate', value: 'upper_intermediate' },
  { label: 'Junior Developer', value: 'junior_developer' },
  { label: 'Pre-advanced', value: 'pre_advanced' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Very Advanced', value: 'very_advanced' },
];

export const projectsStatus = [
  'onGoing',
  'stopped',
  'active',
  'completed',
  'pending',
];

export const projectsDuration = [
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Unexpected',
];

export const paymentTypes = [
  { label: 'Hourly', value: 'hourly' },
  { label: 'Flat rate', value: 'flat_rate' },
  { label: 'Fixed', value: 'fixed' },
  { label: 'Weekly', value: 'weekly' },
];

export const messengers = [
  'Slack',
  'Skype',
  'Whatsapp',
];

export const projectFormatOfCommunication = [
  'Only written',
  'Calls',
  'Video calls',
];
