export const steps = [
  {
    title: "Wrap components with AutoSuspense",
    desc: [
      "Wrap your suspendable components with the AutoSuspense block. It acts as the nearest suspense boundary and manages the orchestration of fallback skeletons.",
    ],
    code: [
      `import { AutoSuspense } from "autosuspense";
import Child1 from "./Child1";
import Child2 from "./Child2";

export default function Parent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Use like a regular Suspense block */}
      <AutoSuspense>
        <Child1 />
        <Child2 />
      </AutoSuspense>
    </div>
  );
}`,
    ],
  },
  {
    title: "Declare component-level Fallback Blocks",
    desc: [
      "Instead of defining the entire fallback tree at once, define fallbacks at a component level using the Suspend function. This allows for modular, reusable skeleton blocks that automatically compose themselves based on your React tree structure.",
    ],
    code: [
      `import { Suspend } from "autosuspense";

const Child1 = () => {
  return (
    <div className="p-4 border rounded">
      <h3>User Profile</h3>
      <p>Data loading...</p>
    </div>
  );
};

// Add any React component to be used as a skeleton
export default Suspend(Child1, <Child1Skeleton />);`,
    ],
  },
  {
    title: "Automatic Skeleton Composition",
    desc: [
      "AutoSuspense automatically detects which components are suspended and wires their individual skeleton blocks into a single, cohesive loading state. This makes your loading UI more robust and less flaky.",
    ],
    code: [
      `// Parent defines the boundary
<AutoSuspense>
  <Profile />
  <Feed />
</AutoSuspense>

// Components define their own fallbacks
export default Suspend(Profile, <ProfileSkeleton />);
export default Suspend(Feed, <FeedSkeleton />);`,
    ],
  },
  {
    title: "Advanced Customization",
    desc: [
      "Utilize the fallbacks prop in the AutoSuspense component to provide nested children or global overrides. You can even use string identifiers to wire pre-defined blocks together.",
    ],
    code: [
      `const Dashboard = () => {
  return (
    <AutoSuspense 
      fallbacks={{
        block: <BlockSkeleton />,
        card: <CardSkeleton />
      }}
    >
      <AsyncWidget1 />
      <AsyncWidget2 />
    </AutoSuspense>
  );
}

const AsyncWidget1 = () => {
  return (
      <div>
        ...
      </div>
  );
}

export default Suspend(AsyncWidget1, "block");
  `,
],
  },
];
