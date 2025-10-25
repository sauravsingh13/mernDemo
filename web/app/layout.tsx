export const metadata = { title: 'SAV MERN Demo', description: 'MERN + Realtime Kanban' };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body style={{ fontFamily: 'Inter,system-ui,Arial' }}>{children}</body></html>;
}
