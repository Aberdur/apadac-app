import type { Access, GlobalConfig } from "payload";

const canManageHelpSettings: Access = ({ req: { user } }) =>
  Boolean(
    user &&
      typeof user === "object" &&
      "role" in user &&
      String(user.role ?? "") === "admin",
  );

export const HelpSettings: GlobalConfig = {
  slug: "como-ayudar",
  access: {
    read: () => true,
    update: canManageHelpSettings,
  },
  admin: {
    group: "Contenido web",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contacto",
          fields: [
            {
              name: "contactEmail",
              type: "email",
              label: "Email de contacto",
            },
            {
              name: "contactPhone",
              type: "text",
              label: "Teléfono",
            },
            {
              name: "whatsapp",
              type: "text",
              label: "WhatsApp",
            },
          ],
        },
        {
          label: "Donaciones",
          fields: [
            {
              name: "donationFunnelButtonImage",
              type: "relationship",
              label: "Imagen del botón flotante de donaciones",
              maxDepth: 1,
              relationTo: "media",
              admin: {
                description:
                  "Se muestra en el botón flotante de donaciones. Recomendado: imagen cuadrada.",
              },
            },
            {
              name: "donationFunnelPanelImage",
              type: "relationship",
              label: "Imagen destacada del panel de donaciones",
              maxDepth: 1,
              relationTo: "media",
              admin: {
                description:
                  "Se muestra dentro del panel de donaciones al abrirlo. Recomendado: imagen cuadrada o vertical.",
              },
            },
            {
              name: "donationText",
              type: "textarea",
              label: "Texto de donaciones",
              defaultValue:
                "Cada aportación ayuda a cubrir alimentación, veterinario, medicación, rescates y urgencias.",
            },
            {
              name: "bizum",
              type: "text",
              label: "Bizum",
            },
            {
              name: "bizumNote",
              type: "textarea",
              label: "Nota para Bizum",
            },
            {
              name: "paypalUrl",
              type: "text",
              label: "Enlace de PayPal",
            },
            {
              name: "bankAccountHolder",
              type: "text",
              label: "Titular de la cuenta",
            },
            {
              name: "bankName",
              type: "text",
              label: "Banco",
            },
            {
              name: "bankSwift",
              type: "text",
              label: "BIC / SWIFT",
            },
            {
              name: "bankBranchInfo",
              type: "textarea",
              label: "Sucursal o información del banco",
            },
            {
              name: "dogsDonationNote",
              type: "textarea",
              label: "Nota de concepto para donaciones de perros",
              defaultValue:
                "Importante: indica en el concepto que es una donación y a qué perro o causa quieres destinarla.",
            },
            {
              name: "dogsBankIban",
              type: "text",
              label: "IBAN donaciones para perros",
            },
            {
              name: "dogsBankSwift",
              type: "text",
              label: "BIC / SWIFT para perros",
            },
            {
              name: "catsDonationNote",
              type: "textarea",
              label: "Nota de concepto para donaciones de gatos",
              defaultValue:
                "Importante: indica en el concepto a qué gato o causa quieres destinar la donación.",
            },
            {
              name: "catsBankIban",
              type: "text",
              label: "IBAN donaciones para gatos",
            },
            {
              name: "catsBankSwift",
              type: "text",
              label: "BIC / SWIFT para gatos",
            },
            {
              name: "bankIban",
              type: "text",
              label: "IBAN / número de cuenta general",
            },
          ],
        },
        {
          label: "Teaming",
          fields: [
            {
              name: "teamingText",
              type: "textarea",
              label: "Texto de Teaming",
              defaultValue:
                "Con una pequeña cuota mensual ayudas a sostener una parte estable del trabajo de la protectora.",
            },
            {
              name: "teamingUrl",
              type: "text",
              label: "Enlace de Teaming",
            },
          ],
        },
        {
          label: "Acogida",
          fields: [
            {
              name: "fosterText",
              type: "textarea",
              label: "Texto de acogida",
              defaultValue:
                "Ser casa de acogida permite sacar animales de situaciones complicadas y conocer mejor su carácter.",
            },
            {
              name: "fosterFormUrl",
              type: "text",
              label: "Enlace o formulario de acogida",
            },
          ],
        },
        {
          label: "Apadrinamiento",
          fields: [
            {
              name: "sponsorshipText",
              type: "textarea",
              label: "Texto de apadrinamiento",
              defaultValue:
                "Apadrinar ayuda especialmente a animales con necesidades especiales, estancias largas o cuidados más costosos.",
            },
            {
              name: "sponsorshipFormUrl",
              type: "text",
              label: "Enlace o formulario de apadrinamiento",
            },
          ],
        },
        {
          label: "Voluntariado",
          fields: [
            {
              name: "volunteerText",
              type: "textarea",
              label: "Texto de voluntariado",
              defaultValue:
                "Paseos, traslados, eventos, difusión o tareas organizativas. Cada hora dedicada cuenta.",
            },
            {
              name: "volunteerFormUrl",
              type: "text",
              label: "Enlace o formulario de voluntariado",
            },
          ],
        },
        {
          label: "Difusión",
          fields: [
            {
              name: "diffusionText",
              type: "textarea",
              label: "Texto de difusión y colaboración",
              defaultValue:
                "Compartir casos, hablar de APADAC y movilizar a otras personas también ayuda a salvar vidas.",
            },
            {
              name: "diffusionFormUrl",
              type: "text",
              label: "Enlace para difusión o colaboración",
            },
          ],
        },
      ],
    },
  ],
};
