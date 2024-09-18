// 学院枚举
enum College {
  MechanicalEngineering = '机械工程学院',
  Management = '管理学院',
  ElectronicsInformation = '电子信息学院（微电子学院）',
  ComputerScience = '计算机学院（软件学院）',
  Automation = '自动化学院（人工智能学院）',
  Science = '理学院',
  TelecommunicationsEngineering = '通信工程学院',
  ForeignLanguages = '外国语学院',
  Accounting = '会计学院',
  Economics = '经济学院',
  MaterialsEnvironmentalEngineering = '材料与环境工程学院',
  Cybersecurity = '网络空间安全学院（浙江保密学院）',
  HumanitiesArtAndDigitalMedia = '人文艺术与数字媒体学院',
  Law = '法学院',
}

// 专业枚举
enum Major {
  MechanicalDesignManufacturingAutomation = '机械设计制造及其自动化',
  VehicleEngineering = '车辆工程',
  IntelligentManufacturingEngineering = '智能制造工程',
  InformationManagementAndInformationSystems = '信息管理与信息系统',
  ConfidentialityManagement = '保密管理',
  BusinessAdministration = '工商管理',
  HumanResourceManagement = '人力资源管理',
  IndustrialEngineering = '工业工程',
  ECommerce = '电子商务',
  ElectronicInformationEngineering = '电子信息工程',
  ElectronicScienceAndTechnology = '电子科学与技术',
  IntegratedCircuitDesignAndIntegratedSystem = '集成电路设计与集成系统',
  ComputerScienceAndTechnology = '计算机科学与技术',
  SoftwareEngineering = '软件工程',
  Automation = '自动化',
  ElectricalEngineeringAndItsAutomation = '电气工程及其自动化',
  IntelligentScienceAndTechnology = '智能科学与技术',
  MeasurementControlTechnologyAndInstrumentation = '测控技术与仪器',
  MedicalInformationEngineering = '医学信息工程',
  MathematicsAndAppliedMathematics = '数学与应用数学',
  InformationAndComputationalScience = '信息与计算科学',
  OptoelectronicInformationScienceAndEngineering = '光电信息科学与工程',
  AppliedPhysics = '应用物理学',
  CommunicationEngineering = '通信工程',
  InformationConfrontationTechnology = '信息对抗技术',
  English = '英语',
  Accounting = '会计学',
  FinanceManagement = '财务管理',
  Auditing = '审计学',
  Statistics = '统计学',
  Economics = '经济学',
  Finance = '金融学',
  InternationalEconomicsAndTrade = '国际经济与贸易',
  MaterialScienceAndEngineering = '材料科学与工程',
  EnvironmentalEngineering = '环境工程',
  NetworkEngineering = '网络工程',
  InformationSecurity = '信息安全',
  Cybersecurity = '网络空间安全',
  Communication = '传播学',
  DigitalMediaTechnology = '数字媒体技术',
  ProductDesign = '产品设计',
  IndustrialDesign = '工业设计',
  DigitalMediaArt = '数字媒体艺术',
  Jurisprudence = '法学',
  Sociology = '社会学',
  ChineseInternationalEducation = '汉语国际教育',
}

// 专业对学院的映射
type MajorToCollege = {
  [key in Major]: College
}

const majorToCollege: MajorToCollege = {
  [Major.MechanicalDesignManufacturingAutomation]:
    College.MechanicalEngineering,
  [Major.VehicleEngineering]: College.MechanicalEngineering,
  [Major.IntelligentManufacturingEngineering]: College.MechanicalEngineering,
  [Major.InformationManagementAndInformationSystems]: College.Management,
  [Major.ConfidentialityManagement]: College.Management,
  [Major.BusinessAdministration]: College.Management,
  [Major.HumanResourceManagement]: College.Management,
  [Major.IndustrialEngineering]: College.Management,
  [Major.ECommerce]: College.Management,
  [Major.ElectronicInformationEngineering]: College.ElectronicsInformation,
  [Major.ElectronicScienceAndTechnology]: College.ElectronicsInformation,
  [Major.IntegratedCircuitDesignAndIntegratedSystem]:
    College.ElectronicsInformation,
  [Major.ComputerScienceAndTechnology]: College.ComputerScience,
  [Major.SoftwareEngineering]: College.ComputerScience,
  [Major.Automation]: College.Automation,
  [Major.ElectricalEngineeringAndItsAutomation]: College.Automation,
  [Major.IntelligentScienceAndTechnology]: College.Automation,
  [Major.MeasurementControlTechnologyAndInstrumentation]: College.Automation,
  [Major.MedicalInformationEngineering]: College.Automation,
  [Major.MathematicsAndAppliedMathematics]: College.Science,
  [Major.InformationAndComputationalScience]: College.Science,
  [Major.OptoelectronicInformationScienceAndEngineering]: College.Science,
  [Major.AppliedPhysics]: College.Science,
  [Major.CommunicationEngineering]: College.TelecommunicationsEngineering,
  [Major.InformationConfrontationTechnology]:
    College.TelecommunicationsEngineering,
  [Major.English]: College.ForeignLanguages,
  [Major.Accounting]: College.Accounting,
  [Major.FinanceManagement]: College.Accounting,
  [Major.Auditing]: College.Accounting,
  [Major.Statistics]: College.Economics,
  [Major.Economics]: College.Economics,
  [Major.Finance]: College.Economics,
  [Major.InternationalEconomicsAndTrade]: College.Economics,
  [Major.MaterialScienceAndEngineering]:
    College.MaterialsEnvironmentalEngineering,
  [Major.EnvironmentalEngineering]: College.MaterialsEnvironmentalEngineering,
  [Major.NetworkEngineering]: College.Cybersecurity,
  [Major.InformationSecurity]: College.Cybersecurity,
  [Major.Cybersecurity]: College.Cybersecurity,
  [Major.Communication]: College.HumanitiesArtAndDigitalMedia,
  [Major.DigitalMediaTechnology]: College.HumanitiesArtAndDigitalMedia,
  [Major.ProductDesign]: College.HumanitiesArtAndDigitalMedia,
  [Major.IndustrialDesign]: College.HumanitiesArtAndDigitalMedia,
  [Major.DigitalMediaArt]: College.HumanitiesArtAndDigitalMedia,
  [Major.Jurisprudence]: College.Law,
  [Major.Sociology]: College.Law,
  [Major.ChineseInternationalEducation]: College.Law,
}
type CollegeToMajors = {
  [key in College]: Major[]
}
//学院对专业的映射表
const collegeToMajors: CollegeToMajors = {
  [College.MechanicalEngineering]: [
    Major.MechanicalDesignManufacturingAutomation,
    Major.VehicleEngineering,
    Major.IntelligentManufacturingEngineering,
  ],
  [College.Management]: [
    Major.InformationManagementAndInformationSystems,
    Major.ConfidentialityManagement,
    Major.BusinessAdministration,
    Major.HumanResourceManagement,
    Major.IndustrialEngineering,
    Major.ECommerce,
  ],
  [College.ElectronicsInformation]: [
    Major.ElectronicInformationEngineering,
    Major.ElectronicScienceAndTechnology,
    Major.IntegratedCircuitDesignAndIntegratedSystem,
  ],
  [College.ComputerScience]: [
    Major.ComputerScienceAndTechnology,
    Major.SoftwareEngineering,
  ],
  [College.Automation]: [
    Major.Automation,
    Major.ElectricalEngineeringAndItsAutomation,
    Major.IntelligentScienceAndTechnology,
    Major.MeasurementControlTechnologyAndInstrumentation,
    Major.MedicalInformationEngineering,
  ],
  [College.Science]: [
    Major.MathematicsAndAppliedMathematics,
    Major.InformationAndComputationalScience,
    Major.OptoelectronicInformationScienceAndEngineering,
    Major.AppliedPhysics,
  ],
  [College.TelecommunicationsEngineering]: [
    Major.CommunicationEngineering,
    Major.InformationConfrontationTechnology,
  ],
  [College.ForeignLanguages]: [Major.English],
  [College.Accounting]: [
    Major.Accounting,
    Major.FinanceManagement,
    Major.Auditing,
  ],
  [College.Economics]: [
    Major.Statistics,
    Major.Economics,
    Major.Finance,
    Major.InternationalEconomicsAndTrade,
  ],
  [College.MaterialsEnvironmentalEngineering]: [
    Major.MaterialScienceAndEngineering,
    Major.EnvironmentalEngineering,
  ],
  [College.Cybersecurity]: [
    Major.NetworkEngineering,
    Major.InformationSecurity,
    Major.Cybersecurity,
  ],
  [College.HumanitiesArtAndDigitalMedia]: [
    Major.Communication,
    Major.DigitalMediaTechnology,
    Major.ProductDesign,
    Major.IndustrialDesign,
    Major.DigitalMediaArt,
  ],
  [College.Law]: [
    Major.Jurisprudence,
    Major.Sociology,
    Major.ChineseInternationalEducation,
  ],
}

export { Major, majorToCollege, College, collegeToMajors }
// export type { MajorToCollege }
