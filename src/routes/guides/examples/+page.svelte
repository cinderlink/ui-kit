<script lang="ts">
	import Typography from '$lib/content/Typography/Typography.svelte';
	import Card from '$lib/content/Card/Card.svelte';
	import Breadcrumb from '$lib/navigation/Breadcrumb/Breadcrumb.svelte';
	import CodeEditor from '$lib/markup/CodeEditor/CodeEditor.svelte';
	import Button from '$lib/interactive/Button/Button.svelte';
	import Input from '$lib/interactive/Input/Input.svelte';
	import Modal from '$lib/interactive/Modal/Modal.svelte';
	import Avatar from '$lib/content/Avatar/Avatar.svelte';

	let showModal = $state(false);
	let searchQuery = $state('');

	let dashboardExample = $state(
		`<` +
			`script lang="ts">
  import { 
    Card, Typography, Avatar, Button, 
    StatusIndicator, LoadingIndicator 
  } from '@cinderlink/ui-kit';
  
  let user = $state({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatar.jpg',
    status: 'online'
  });
  
  let stats = $state([
    { label: 'Total Users', value: '1,234' },
    { label: 'Active Sessions', value: '89' },
    { label: 'Revenue', value: '$12,345' }
  ]);
<` +
			`/script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  {#each stats as stat}
    <Card>
      <Typography el="h3">{stat.value}</Typography>
      <Typography el="p">{stat.label}</Typography>
    </Card>
  {/each}
</div>

<Card>
  <div class="flex items-center gap-4">
    <Avatar image={user.avatar} size="lg" />
    <div>
      <Typography el="h2">{user.name}</Typography>
      <Typography el="p">{user.email}</Typography>
      <StatusIndicator status={user.status} />
    </div>
  </div>
</Card>`
	);

	let formExample = $state(
		`<` +
			`script lang="ts">
  import { 
    Card, Typography, Input, Button, 
    Select, Toggle, Notification 
  } from '@cinderlink/ui-kit';
  
  let formData = $state({
    name: '',
    email: '',
    role: 'user',
    notifications: true
  });
  
  let showSuccess = $state(false);
  
  function handleSubmit() {
    // Validate and submit
    showSuccess = true;
    setTimeout(() => showSuccess = false, 3000);
  }
<` +
			`/script>

<Card>
  <Typography el="h2">User Settings</Typography>
  
  <div class="space-y-4">
    <Input 
      id="name" 
      label="Full Name" 
      bind:value={formData.name}
      placeholder="Enter your name" 
    />
    
    <Input 
      id="email" 
      type="email" 
      label="Email Address" 
      bind:value={formData.email}
      placeholder="Enter your email" 
    />
    
    <Select 
      id="role" 
      label="Role" 
      bind:value={formData.role}
      options={[
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Administrator' },
        { value: 'editor', label: 'Editor' }
      ]}
    />
    
    <Toggle 
      id="notifications" 
      label="Enable Notifications"
      bind:toggled={formData.notifications}
    />
    
    <Button onclick={handleSubmit} variant="default">
      Save Changes
    </Button>
  </div>
</Card>

{#if showSuccess}
  <Notification type="success" title="Settings saved successfully!" />
{/if}`
	);

	let dataTableExample = $state(
		`<` +
			`script lang="ts">
  import { Card, Typography, Datatable, Button, Avatar } from '@cinderlink/ui-kit';
  
  let users = $state([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'inactive' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'Editor', status: 'active' }
  ]);
  
  let columns = [
    { 
      key: 'name', 
      label: 'User',
      render: (user) => \`
        <div class="flex items-center gap-2">
          <Avatar size="sm" />
          <span>\${user.name}</span>
        </div>
      \`
    },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { 
      key: 'status', 
      label: 'Status',
      render: (user) => \`
        <span class="px-2 py-1 rounded text-xs \${
          user.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }">
          \${user.status}
        </span>
      \`
    }
  ];
<` +
			`/script>

<Card>
  <Typography el="h2">User Management</Typography>
  <Datatable data={users} {columns} />
</Card>`
	);

	let modalExample = $state(
		`<` +
			`script lang="ts">
  import { Button, Modal, Typography, Input } from '@cinderlink/ui-kit';
  
  let showModal = $state(false);
  let username = $state('');
  
  function createUser() {
    // Handle user creation
    showModal = false;
    username = '';
  }
<` +
			`/script>

<Button onclick={() => showModal = true}>
  Create New User
</Button>

<Modal bind:visible={showModal} title="Create User">
  <div class="space-y-4">
    <Input 
      id="username" 
      label="Username" 
      bind:value={username}
      placeholder="Enter username" 
    />
    
    <div class="flex gap-2 justify-end">
      <Button 
        variant="outlined" 
        onclick={() => showModal = false}
      >
        Cancel
      </Button>
      <Button onclick={createUser}>
        Create
      </Button>
    </div>
  </div>
</Modal>`
	);
</script>

<Breadcrumb
	sections={[
		{ label: 'guides', path: '/guides' },
		{ label: 'examples', path: '/guides/examples' }
	]}
/>

<div class="max-w-6xl mx-auto space-y-6">
	<Typography el="h1">Examples</Typography>
	<Typography el="p">
		Real-world examples showing how to build common UI patterns with @cinderlink/ui-kit.
	</Typography>

	<!-- Live Demo Section -->
	<Card>
		<Typography el="h2" classes="mb-4">Interactive Demo</Typography>
		<Typography el="p" classes="mb-4">Try out some components right here:</Typography>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-4">
				<Input
					id="demo-search"
					label="Search"
					bind:value={searchQuery}
					placeholder="Type something..."
				/>

				<div class="flex items-center gap-4">
					<Avatar size="md" />
					<div>
						<Typography el="h4">Demo User</Typography>
						<Typography el="p">user@example.com</Typography>
					</div>
				</div>

				<Button onclick={() => (showModal = true)} variant="glass">Open Modal</Button>
			</div>

			<div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
				<Typography el="h4" classes="mb-2">Search Query:</Typography>
				<Typography el="p">{searchQuery || 'No input yet'}</Typography>
			</div>
		</div>
	</Card>

	<Modal bind:visible={showModal}>
		{#snippet header()}
			<Typography el="h3">Demo Modal</Typography>
		{/snippet}

		<Typography el="p" classes="mb-4">
			This is a demo modal built with the @cinderlink/ui-kit Modal component.
		</Typography>

		{#snippet footer()}
			<div class="flex justify-end">
				<Button onclick={() => (showModal = false)}>Close</Button>
			</div>
		{/snippet}
	</Modal>

	<!-- Dashboard Example -->
	<Card>
		<Typography el="h2" classes="mb-3">Dashboard Layout</Typography>
		<Typography el="p" classes="mb-4">
			Build responsive dashboards with cards, stats, and user information:
		</Typography>
		<CodeEditor bind:code={dashboardExample} language="svelte" readOnly />
	</Card>

	<!-- Form Example -->
	<Card>
		<Typography el="h2" classes="mb-3">Settings Form</Typography>
		<Typography el="p" classes="mb-4">
			Create comprehensive forms with validation and notifications:
		</Typography>
		<CodeEditor bind:code={formExample} language="svelte" readOnly />
	</Card>

	<!-- Data Table Example -->
	<Card>
		<Typography el="h2" classes="mb-3">Data Table</Typography>
		<Typography el="p" classes="mb-4">
			Display tabular data with custom renderers and styling:
		</Typography>
		<CodeEditor bind:code={dataTableExample} language="svelte" readOnly />
	</Card>

	<!-- Modal Example -->
	<Card>
		<Typography el="h2" classes="mb-3">Modal Dialog</Typography>
		<Typography el="p" classes="mb-4">
			Create modal dialogs for forms, confirmations, and overlays:
		</Typography>
		<CodeEditor bind:code={modalExample} language="svelte" readOnly />
	</Card>

	<Card>
		<Typography el="h2" classes="mb-3">More Examples</Typography>
		<Typography el="p" classes="mb-3">Explore more examples and patterns:</Typography>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div class="space-y-2">
				<Typography el="h4">Component Examples</Typography>
				<ul class="space-y-1 text-sm">
					<li>
						• <a href="/components/content" class="text-purple-600 hover:text-purple-800"
							>Content Components</a
						>
					</li>
					<li>
						• <a href="/components/interactive" class="text-purple-600 hover:text-purple-800"
							>Interactive Components</a
						>
					</li>
					<li>
						• <a href="/components/layout" class="text-purple-600 hover:text-purple-800"
							>Layout Components</a
						>
					</li>
				</ul>
			</div>

			<div class="space-y-2">
				<Typography el="h4">Advanced Topics</Typography>
				<ul class="space-y-1 text-sm">
					<li>
						• <a href="/themes/customization" class="text-purple-600 hover:text-purple-800"
							>Custom Theming</a
						>
					</li>
					<li>
						• <a href="/guides/installation" class="text-purple-600 hover:text-purple-800"
							>Installation Guide</a
						>
					</li>
					<li>
						• <a href="/guides/quickstart" class="text-purple-600 hover:text-purple-800"
							>Quick Start</a
						>
					</li>
				</ul>
			</div>
		</div>
	</Card>
</div>
