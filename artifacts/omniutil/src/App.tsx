import { Layout } from "@/components/layout";
import { Switch, Route } from "wouter";
import { I18nProvider } from "@/lib/i18n";
import Home from "@/pages/home";
import PartnerApply from "@/pages/partner-apply";
import PartnerDashboard from "@/pages/partner-dashboard";
import AdminDashboard from "@/pages/admin-dashboard";
import Users from "@/pages/users";
import Partners from "@/pages/partners";
import Listing from "@/pages/listing";

export default function App() {
  return (
    <I18nProvider>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/partner/apply" component={PartnerApply} />
          <Route path="/partner/dashboard" component={PartnerDashboard} />
          <Route path="/dashboard" component={AdminDashboard} />
          <Route path="/users" component={Users} />
          <Route path="/partners" component={Partners} />
          <Route path="/listing" component={Listing} />
          <Route>
            <div className="p-8 text-center text-muted-foreground">404 Not Found</div>
          </Route>
        </Switch>
      </Layout>
    </I18nProvider>
  );
}
