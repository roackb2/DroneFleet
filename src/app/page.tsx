import type { AppType } from 'next/app';
import { redirect } from 'next/navigation'
import type { Session } from 'next-auth';
import { getSession, SessionProvider } from 'next-auth/react';
import { api } from '@/utils/api'

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  const loggedIn = true

  if (loggedIn) redirect('/dashboard')

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

App.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default api.withTRPC(App);
