import React from "react";
import { Switch, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../services/LanguageContext";
import DashboardHeader from "../../UI/Header";


const Setting = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  return (
    <>
      <DashboardHeader  />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md">
            <h2 className="text-xl font-semibold mb-6">{t('settings.title')}</h2>
            
            {/* Language Switch */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="text-lg font-medium">{t('settings.language')}</h3>
                <p className="text-gray-500 text-sm">
                  {t('settings.languageDescription')}
                </p>
              </div>
              <Switch
                checked={language === 'es'}
                onChange={toggleLanguage}
                checkedChildren="ES"
                unCheckedChildren="EN"
                className="bg-gray-300"
              />
            </div>

            {/* Add other settings sections here */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Setting;
