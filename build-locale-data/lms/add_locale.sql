SET IDENTITY_INSERT [dbo].[LOCALE_CULTURE] ON;

UPDATE [dbo].[LOCALE_CULTURE] SET [CultureCode] = N'ca-ES', [DecimalSeparator] = N',', [DurationFormat] = N'{hhh}:{mm}:{ss}', [FirstDayOfWeek] = 1, [GroupSeparator] = N'.', [GroupSizes] = N'3', [InputDateFormat] = N'dd/MM/yyyy', [LongDateFormat] = N'dddd, d MMMM'' del ''yyyy', [MonthAndDay] = N'd MMMM', [NativeDigits] = N'0,1,2,3,4,5,6,7,8,9', [NegativeNumberPattern] = 1, [NegativeSign] = N'-', [PercentNegativePattern] = 1, [PercentPositivePattern] = 1, [PercentSymbol] = N'%', [ShortDateFormat] = N'd/M/yy', [ShortMonthAndDay] = N'd MMM', [StandardDateFormat] = N'd MMMM'' del ''yyyy', [TimeFormat] = N'H:mm', [WeekendEndDay] = 0, [WeekendStartDay] = 6, [YearAndMonth] = N'MMMM'' del ''yyyy' WHERE ( [CultureId] = 29 );
IF ( @@ROWCOUNT = 0 )INSERT INTO [dbo].[LOCALE_CULTURE] ( [CultureCode], [CultureId], [DecimalSeparator], [DurationFormat], [FirstDayOfWeek], [GroupSeparator], [GroupSizes], [InputDateFormat], [LongDateFormat], [MonthAndDay], [NativeDigits], [NegativeNumberPattern], [NegativeSign], [PercentNegativePattern], [PercentPositivePattern], [PercentSymbol], [ShortDateFormat], [ShortMonthAndDay], [StandardDateFormat], [TimeFormat], [WeekendEndDay], [WeekendStartDay], [YearAndMonth] ) VALUES ( N'ca-ES', 29, N',', N'{hhh}:{mm}:{ss}', 1, N'.', N'3', N'dd/MM/yyyy', N'dddd, d MMMM'' del ''yyyy', N'd MMMM', N'0,1,2,3,4,5,6,7,8,9', 1, N'-', 1, 1, N'%', N'd/M/yy', N'd MMM', N'd MMMM'' del ''yyyy', N'H:mm', 0, 6, N'MMMM'' del ''yyyy' );

SET IDENTITY_INSERT [dbo].[LOCALE_CULTURE] OFF;

GO

SET IDENTITY_INSERT [dbo].[LANG_LANGUAGES] ON;

UPDATE [dbo].[LANG_LANGUAGES] SET [CultureClass] = 'ca-es', [IsDeleted] = 0, [LanguageTypeId] = 1, [Name] = N'Català (Espanya)', [OwnerOrgId] = NULL, [ParentLanguageId] = NULL WHERE ( [LanguageId] = 38 );
IF ( @@ROWCOUNT = 0 )INSERT INTO [dbo].[LANG_LANGUAGES] ( [CultureClass], [IsDeleted], [LanguageId], [LanguageTypeId], [Name], [OwnerOrgId], [ParentLanguageId] ) VALUES ( 'ca-es', 0, 38, 1, N'Català (Espanya)', NULL, NULL );

SET IDENTITY_INSERT [dbo].[LANG_LANGUAGES] OFF;

GO

SET IDENTITY_INSERT [dbo].[LOCALE] ON;

UPDATE [dbo].[LOCALE] SET [CultureId] = 29, [ImageSetId] = 0, [LanguageId] = 38, [LocaleName] = N'Català (Espanya)', [TextDirection] = 1 WHERE ( [LocaleId] = 29 );
IF ( @@ROWCOUNT = 0 )INSERT INTO [dbo].[LOCALE] ( [CultureId], [ImageSetId], [LanguageId], [LocaleId], [LocaleName], [TextDirection] ) VALUES ( 29, 0, 38, 29, N'Català (Espanya)', 1 );

SET IDENTITY_INSERT [dbo].[LOCALE] OFF;

GO
