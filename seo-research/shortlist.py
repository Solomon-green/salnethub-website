"""Shortlist of autocomplete keywords relevant to SalnetHub, tagged with intent and target page.
Every keyword here came from autocomplete.csv (real Google suggestions). Volumes and
difficulty are added in the next step from Keyword Planner / SERP checks.

Usage: python -I shortlist.py autocomplete.csv candidates.csv
"""
import csv
import sys

S = "/services/"
# (keyword, intent, target page)  intent: commercial -> service pages, informational -> blog
CANDIDATES = [
    # Marketing & CRM automation
    ("crm automation services", "commercial", S + "marketing-crm-automation"),
    ("marketing automation services", "commercial", S + "marketing-crm-automation"),
    ("hubspot automation services", "commercial", S + "marketing-crm-automation"),
    ("crm automation", "commercial", S + "marketing-crm-automation"),
    ("marketing automation for small businesses", "commercial", S + "marketing-crm-automation"),
    ("marketing automation for real estate", "commercial", "industry: real estate"),
    ("marketing automation for law firms", "commercial", "industry: law firms"),
    ("what is crm automation", "informational", "blog"),
    ("crm automation examples", "informational", "blog"),
    ("how to automate hubspot emails", "informational", "blog"),
    ("zoho crm workflow examples", "informational", "blog"),
    # Lead acquisition & qualification
    ("speed to lead services", "commercial", S + "lead-acquisition-qualification"),
    ("speed to lead ai", "commercial", S + "lead-acquisition-qualification"),
    ("lead routing automation", "commercial", S + "lead-acquisition-qualification"),
    ("lead distribution automation", "commercial", S + "lead-acquisition-qualification"),
    ("automated lead follow up system", "commercial", S + "lead-acquisition-qualification"),
    ("lead reactivation services", "commercial", S + "lead-acquisition-qualification"),
    ("lead reactivation agency", "commercial", S + "lead-acquisition-qualification"),
    ("missed call text back service", "commercial", S + "lead-acquisition-qualification"),
    ("missed call text back for contractors", "commercial", "industry: contractors"),
    ("speed to lead real estate", "commercial", "industry: real estate"),
    ("what is speed to lead", "informational", "blog"),
    ("speed to lead statistics", "informational", "blog"),
    ("how to automate lead follow up", "informational", "blog"),
    ("lead reactivation campaign", "informational", "blog"),
    ("dead lead reactivation", "informational", "blog"),
    ("how does missed call text back work", "informational", "blog"),
    ("how much does missed call text back cost", "informational", "blog"),
    # Pricing model (pay per result)
    ("pay per appointment lead generation", "commercial", "/engagements"),
    ("pay per appointment agency", "commercial", "/engagements"),
    ("pay per appointment model", "informational", "blog"),
    ("pay per lead services", "commercial", "/engagements"),
    ("performance based marketing agency", "commercial", "/engagements"),
    ("how to calculate cost per appointment", "informational", "blog"),
    ("how to calculate cost per lead", "informational", "blog"),
    ("what is a good cost per lead", "informational", "blog"),
    # Data reporting & analytics
    ("automated reporting for clients", "commercial", S + "data-reporting-analytics"),
    ("automated reporting and dashboards", "commercial", S + "data-reporting-analytics"),
    ("automated dashboard in google sheets", "informational", "blog"),
    ("looker studio dashboard from google sheets", "informational", "blog"),
    ("how to automate reporting", "informational", "blog"),
    ("how to build an automated dashboard", "informational", "blog"),
    ("looker studio dashboard examples", "informational", "blog"),
    # Business process automation
    ("business process automation services", "commercial", S + "business-process-automation"),
    ("business process automation company", "commercial", S + "business-process-automation"),
    ("client onboarding automation", "commercial", S + "business-process-automation"),
    ("customer onboarding automation", "commercial", S + "business-process-automation"),
    ("invoice automation services", "commercial", S + "business-process-automation"),
    ("approval workflow automation", "commercial", S + "business-process-automation"),
    ("document automation for law firms", "commercial", "industry: law firms"),
    ("ai automation for accounting firms", "commercial", "industry: accounting firms"),
    ("what is business process automation", "informational", "blog"),
    ("business process automation examples", "informational", "blog"),
    ("business process automation with ai", "informational", "blog"),
    ("how to automate invoice processing", "informational", "blog"),
    ("client onboarding process", "informational", "blog"),
    # Task & workflow automation
    ("workflow automation services", "commercial", S + "task-workflow-automation"),
    ("n8n automation services", "commercial", S + "task-workflow-automation"),
    ("zapier automation services", "commercial", S + "task-workflow-automation"),
    ("make automation service", "commercial", S + "task-workflow-automation"),
    ("google sheet automation service", "commercial", S + "task-workflow-automation"),
    ("workflow automation for small business", "commercial", S + "task-workflow-automation"),
    ("automation for small business", "commercial", S + "task-workflow-automation"),
    ("ai automation services for small business", "commercial", S + "task-workflow-automation"),
    ("workflow automation examples", "informational", "blog"),
    ("n8n automation vs zapier", "informational", "blog"),
    ("make automation vs zapier", "informational", "blog"),
    ("how to automate google sheets", "informational", "blog"),
    ("how to automate emails from google sheets", "informational", "blog"),
    ("how to automate data entry", "informational", "blog"),
    ("best zapier automations for small business", "informational", "blog"),
    ("best n8n automations for business", "informational", "blog"),
    ("google apps script automation", "informational", "blog"),
    # AI chatbots
    ("ai chatbot for small business", "commercial", S + "ai-chatbots"),
    ("ai chatbot for website", "commercial", S + "ai-chatbots"),
    ("ai chatbot for website cost", "commercial", S + "ai-chatbots"),
    ("ai chatbot for customer service", "commercial", S + "ai-chatbots"),
    ("ai chatbot for appointment booking", "commercial", S + "ai-chatbots"),
    ("whatsapp chatbot for business", "commercial", S + "ai-chatbots"),
    ("whatsapp automation for business", "commercial", S + "ai-chatbots"),
    ("whatsapp automation services", "commercial", S + "ai-chatbots"),
    ("chatbot for dental clinic", "commercial", "industry: dental clinics"),
    ("ai chatbot for real estate", "commercial", "industry: real estate"),
    ("chatbot for real estate website", "commercial", "industry: real estate"),
    ("whatsapp automation for clinics", "commercial", "industry: clinics"),
    ("how to add ai chatbot in website", "informational", "blog"),
    ("whatsapp business chatbot cost", "informational", "blog"),
    ("ai chatbot cost", "informational", "blog"),
    # AI receptionist / voice (new, from pricing model)
    ("ai receptionist for small business", "commercial", "new: ai receptionist"),
    ("ai receptionist services", "commercial", "new: ai receptionist"),
    ("ai answering services for small business", "commercial", "new: ai receptionist"),
    ("ai receptionist for dental office", "commercial", "industry: dental clinics"),
    ("ai receptionist for medical office", "commercial", "industry: clinics"),
    ("ai receptionist for hvac", "commercial", "industry: hvac"),
    ("ai receptionist cost", "informational", "blog"),
    ("ai receptionist vs human receptionist", "informational", "blog"),
    ("ai appointment booking system", "commercial", "new: ai receptionist"),
    # Custom AI agents
    ("ai agent for business automation", "commercial", S + "custom-ai-agents"),
    ("best ai agent for small business", "commercial", S + "custom-ai-agents"),
    ("best ai email assistant for business", "commercial", S + "custom-ai-agents"),
    ("how to build ai agent for business", "informational", "blog"),
    ("ai agents examples", "informational", "blog"),
    ("how to automate customer service with ai", "informational", "blog"),
    # RAG
    ("rag chatbot for company documents", "commercial", S + "rag-systems"),
    ("ai knowledge base chatbot", "commercial", S + "rag-systems"),
    ("internal knowledge base ai", "commercial", S + "rag-systems"),
    ("ai knowledge base service", "commercial", S + "rag-systems"),
    ("rag chatbot for website", "commercial", S + "rag-systems"),
    ("how to build ai chatbot with custom knowledge base", "informational", "blog"),
    ("ai knowledge base vs rag", "informational", "blog"),
    ("rag chatbot pricing", "informational", "blog"),
    # Web
    ("website crm integration", "commercial", S + "web-solutions"),
    # Agency-level
    ("ai automation agency for small businesses", "commercial", "/"),
    ("ai automation agency services list", "informational", "blog"),
    ("ai automation agency for law firms", "commercial", "industry: law firms"),
    ("ai automation for real estate agents", "commercial", "industry: real estate"),
    ("ai automation for dental clinics", "commercial", "industry: dental clinics"),
    ("automation for accounting firms", "commercial", "industry: accounting firms"),
    ("workflow automation for law firms", "commercial", "industry: law firms"),
]


def main(src, out):
    real = {r["keyword"] for r in csv.DictReader(open(src, encoding="utf-8"))}
    missing = [k for k, _, _ in CANDIDATES if k not in real]
    if missing:
        sys.exit(f"Not from autocomplete (fix before use): {missing}")
    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["keyword", "intent", "target_page"])
        w.writerows(CANDIDATES)
    print(f"{len(CANDIDATES)} candidates, all verified against autocomplete")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
