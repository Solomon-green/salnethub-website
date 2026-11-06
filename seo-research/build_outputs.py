"""Build the Phase 2 outputs from merged.csv (autocomplete + Keyword Planner volumes)
plus SERP-based difficulty judgements (who ranks in the top results, checked 2026-11-06).

Difficulty is qualitative (no paid KD tool): Low = thin/small sites and freelancers rank,
Medium = mid-size agencies/niche SaaS, Hard = big brands (Salesforce, IBM, ServiceNow...).
'unchecked' = not yet SERP-checked; check before writing that page/post.

Usage: python -I build_outputs.py
"""
import csv

DIFF = {  # keyword: (difficulty, evidence)
    "crm automation": ("Hard", "Salesforce, Freshworks, Shopify, ActiveCampaign"),
    "ai chatbot for website": ("Hard", "Botpress, Jotform, IONOS, chatbot SaaS"),
    "ai chatbot for customer service": ("Hard", "Salesforce, Sendbird, chatbot SaaS"),
    "ai receptionist for small business": ("Medium", "thin vendor blogs: callin.io, myaifrontdesk, ringly"),
    "ai chatbot for small business": ("Medium", "Bluehost, Salesforce blog, small chatbot vendors"),
    "ai chatbot for real estate": ("Low", "freelancers, Gumroad templates, small vendors"),
    "ai receptionist services": ("Hard", "Salesforce, Gartner, RingCentral, Webex"),
    "ai receptionist for medical office": ("Medium", "one vendor's repetitive blog posts dominate"),
    "business process automation services": ("Medium", "mid-size agencies: Charter Global, Imaginovation, SageIT"),
    "workflow automation services": ("Medium", "agencies: Bitcot, Bacancy, Toptal, Intuz"),
    "n8n automation services": ("Low", "freelancers, small agencies, pages.dev sites"),
    "marketing automation services": ("Medium", "mid-size agencies, Wikipedia"),
    "client onboarding automation": ("Hard", "ClickUp, Zapier, Salesforce, onboarding SaaS"),
    "automated reporting for clients": ("Hard", "AgencyAnalytics, Whatagraph, Coupler"),
    "whatsapp chatbot for business": ("Hard", "Sinch, CM.com, Gupshup, Airtel"),
    "workflow automation for small business": ("Hard", "Salesforce, Jotform, Superhuman, Cognito Forms"),
    "automation for small business": ("Hard", "Salesforce, Zapier, Entrepreneur, Bluehost"),
    "business process automation company": ("Medium", "listicles and directories (CB Insights, Process Street)"),
    "marketing automation for real estate": ("Medium", "Mailchimp, Brevo, Luxury Presence, callin.io"),
    "performance based marketing agency": ("Medium", "ad agencies and listicles; intent = paid ads, weak fit"),
    "pay per appointment lead generation": ("Medium", "B2B appointment-setting firms (Belkins); intent = outsourced SDRs, weak fit"),
    "missed call text back service": ("Low", "small SaaS, templates, thin pages"),
    "ai receptionist for dental office": ("Low", "one vendor's repetitive blog posts dominate"),
    "crm automation services": ("Low", "one-page sites, Fiverr gigs, small agencies"),
    "what is business process automation": ("Hard", "IBM, ServiceNow, Kissflow"),
    "ai agents examples": ("Medium", "many mid-size blogs (Workday, Unito, Azilen)"),
    "what is speed to lead": ("Medium", "Chili Piper, MadKudu, Hatch, Calldrip"),
    "speed to lead statistics": ("Medium", "stat roundups copying each other; room for verified stats"),
    "ai receptionist cost": ("Low", "vendor blogs (myaifrontdesk, callin.io, Hyperleap)"),
    "ai chatbot cost": ("Medium", "dev agencies' cost guides, Bluehost"),
    "how to calculate cost per lead": ("Low", "SendPulse, Gleam, small agency blogs"),
    "workflow automation examples": ("Medium", "ServiceNow, Workato, Process Street"),
}

# Recommended priority (1 = do first). Commercial: winnable + fits an existing/new page.
PRIORITY = {
    "ai receptionist for small business": 1, "n8n automation services": 1, "crm automation services": 1,
    "ai chatbot for real estate": 1, "ai receptionist for dental office": 1, "ai receptionist cost": 1,
    "how to calculate cost per lead": 1, "speed to lead statistics": 1,
    "workflow automation services": 2, "business process automation services": 2, "marketing automation services": 2,
    "missed call text back service": 2, "ai receptionist for medical office": 2, "ai chatbot for small business": 2,
    "what is speed to lead": 2, "ai chatbot cost": 2,
}

FIELDS = ["keyword", "volume_range", "tier", "difficulty", "top_results", "intent", "target_page",
          "ads_competition", "cpc_high_usd", "priority", "status"]


def main():
    rows = list(csv.DictReader(open("merged.csv", encoding="utf-8")))
    service, blog = [], []
    for r in rows:
        if r["tier"] == "-":  # under 10 searches a month: dropped
            continue
        d, ev = DIFF.get(r["keyword"], ("unchecked", ""))
        out = {**{k: r[k] for k in ["keyword", "volume_range", "tier", "intent", "target_page", "ads_competition", "cpc_high_usd"]},
               "difficulty": d, "top_results": ev, "priority": PRIORITY.get(r["keyword"], 3), "status": "unused"}
        if d == "Hard":
            out["priority"] = 4  # keep for later, once the site has authority
        (service if r["intent"] == "commercial" else blog).append(out)
    order = {"A": 0, "B": 1, "C": 2}
    for name, data in [("service-keywords.csv", service), ("keywords.csv", blog)]:
        data.sort(key=lambda x: (x["priority"], order[x["tier"]], x["keyword"]))
        with open(name, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=FIELDS)
            w.writeheader()
            w.writerows(data)
        print(name, len(data), "rows")


if __name__ == "__main__":
    main()
