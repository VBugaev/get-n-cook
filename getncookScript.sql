USE [master]
GO
/****** Object:  Database [GetncookDB]    Script Date: 1/11/2019 8:59:51 AM ******/
CREATE DATABASE [GetncookDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GetncookDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQL2014\MSSQL\DATA\GetncookDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GetncookDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQL2014\MSSQL\DATA\GetncookDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [GetncookDB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GetncookDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GetncookDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GetncookDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GetncookDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GetncookDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GetncookDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [GetncookDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GetncookDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GetncookDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GetncookDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GetncookDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GetncookDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GetncookDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GetncookDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GetncookDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GetncookDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GetncookDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GetncookDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GetncookDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GetncookDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GetncookDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GetncookDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GetncookDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GetncookDB] SET RECOVERY FULL 
GO
ALTER DATABASE [GetncookDB] SET  MULTI_USER 
GO
ALTER DATABASE [GetncookDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GetncookDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GetncookDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GetncookDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GetncookDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'GetncookDB', N'ON'
GO
ALTER DATABASE [GetncookDB] SET QUERY_STORE = OFF
GO
USE [GetncookDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [GetncookDB]
GO
/****** Object:  User [defaultAdmin]    Script Date: 1/11/2019 8:59:51 AM ******/
CREATE USER [defaultAdmin] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  UserDefinedTableType [dbo].[IdsList]    Script Date: 1/11/2019 8:59:51 AM ******/
CREATE TYPE [dbo].[IdsList] AS TABLE(
	[Id] [uniqueidentifier] NULL
)
GO
/****** Object:  UserDefinedFunction [dbo].[GetRecipeRating]    Script Date: 1/11/2019 8:59:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[GetRecipeRating]
(
	@RecipeId uniqueidentifier
)
RETURNS float
AS
Begin
	Declare @RateAvg float;
	Set @RateAvg = (Select avg(Rate) from [dbo].[UsersRecipesRating] as ur
	where ur.RecipeId = @RecipeId);
	Return @RateAvg;
End
GO
/****** Object:  Table [dbo].[UsersRecipesRating]    Script Date: 1/11/2019 8:59:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsersRecipesRating](
	[UserId] [uniqueidentifier] NOT NULL,
	[RecipeId] [uniqueidentifier] NOT NULL,
	[Rate] [int] NOT NULL,
 CONSTRAINT [PK_UsersRecipesRating_1] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RecipeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  UserDefinedFunction [dbo].[GetRecipeRatingInfoTable]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[GetRecipeRatingInfoTable]
(
	@RecipeId uniqueidentifier
)
RETURNS table
AS
Return 
(Select avg(Rate) as RecipeRating, count(UserId) as UsersCount
 from [dbo].[UsersRecipesRating] as ur
	where ur.RecipeId = @RecipeId);
GO
/****** Object:  Table [dbo].[Carts]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Carts](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](50) NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[CreatedAt] [datetimeoffset](7) NOT NULL,
	[Text] [nvarchar](100) NULL,
 CONSTRAINT [PK_Carts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CartsRecipes]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CartsRecipes](
	[RecipeId] [uniqueidentifier] NOT NULL,
	[CartId] [uniqueidentifier] NOT NULL,
	[PortionsCount] [int] NULL,
 CONSTRAINT [PK_CartsRecipes] PRIMARY KEY CLUSTERED 
(
	[RecipeId] ASC,
	[CartId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Images]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Images](
	[Id] [uniqueidentifier] NOT NULL,
	[FileName] [nvarchar](max) NULL,
	[MIMEType] [nvarchar](50) NOT NULL,
	[BinaryData] [varbinary](max) NULL,
 CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ImagesRecipes]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ImagesRecipes](
	[RecipeId] [uniqueidentifier] NOT NULL,
	[ImageId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_ImagesRecipes] PRIMARY KEY CLUSTERED 
(
	[RecipeId] ASC,
	[ImageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ingredients]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ingredients](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](max) NULL,
 CONSTRAINT [PK_Ingredients] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Logs]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logs](
	[Id] [uniqueidentifier] NOT NULL,
	[Date] [datetimeoffset](7) NOT NULL,
	[ActionType] [nvarchar](50) NOT NULL,
	[Action] [nvarchar](max) NOT NULL,
	[Entity] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Passwords]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Passwords](
	[UserId] [uniqueidentifier] NOT NULL,
	[Hash] [nvarchar](max) NOT NULL,
	[CreatedAt] [datetimeoffset](7) NOT NULL,
	[UpdatedAt] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_Passwords] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Recipes]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recipes](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](250) NOT NULL,
	[CreatorId] [uniqueidentifier] NOT NULL,
	[Difficulty] [int] NULL,
	[PreparationTime] [int] NULL,
	[CreatedAt] [datetimeoffset](7) NOT NULL,
	[UpdatedAt] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_Recipes_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RecipesCategories]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RecipesCategories](
	[RecipeId] [uniqueidentifier] NOT NULL,
	[CategoryId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_RecipesCategories] PRIMARY KEY CLUSTERED 
(
	[RecipeId] ASC,
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RecipesIngredients]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RecipesIngredients](
	[RecipeId] [uniqueidentifier] NOT NULL,
	[IngredientId] [uniqueidentifier] NOT NULL,
	[Grammes] [bigint] NOT NULL,
 CONSTRAINT [PK_RecipesIngredients] PRIMARY KEY CLUSTERED 
(
	[RecipeId] ASC,
	[IngredientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RecipesSteps]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RecipesSteps](
	[RecipeId] [uniqueidentifier] NOT NULL,
	[StepId] [uniqueidentifier] NOT NULL,
	[OrderNumber] [int] NOT NULL,
 CONSTRAINT [PK_RecipesSteps] PRIMARY KEY CLUSTERED 
(
	[RecipeId] ASC,
	[StepId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[UserId] [uniqueidentifier] NOT NULL,
	[RecipeId] [uniqueidentifier] NOT NULL,
	[CreatedAt] [datetimeoffset](7) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Text] [nvarchar](max) NULL,
 CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RecipeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[Id] [uniqueidentifier] NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Steps]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Steps](
	[Id] [uniqueidentifier] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Steps] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Surname] [nvarchar](50) NULL,
	[Login] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[AboutSection] [nvarchar](max) NULL,
	[RoleId] [uniqueidentifier] NOT NULL,
	[CreatedAt] [datetimeoffset](7) NOT NULL,
	[UpdatedAt] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_Users_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Carts]  WITH CHECK ADD  CONSTRAINT [FK_Carts_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Carts] CHECK CONSTRAINT [FK_Carts_Users]
GO
ALTER TABLE [dbo].[CartsRecipes]  WITH CHECK ADD  CONSTRAINT [FK_CartsRecipes_Carts] FOREIGN KEY([CartId])
REFERENCES [dbo].[Carts] ([Id])
GO
ALTER TABLE [dbo].[CartsRecipes] CHECK CONSTRAINT [FK_CartsRecipes_Carts]
GO
ALTER TABLE [dbo].[CartsRecipes]  WITH CHECK ADD  CONSTRAINT [FK_CartsRecipes_Recipes] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
ALTER TABLE [dbo].[CartsRecipes] CHECK CONSTRAINT [FK_CartsRecipes_Recipes]
GO
ALTER TABLE [dbo].[Images]  WITH NOCHECK ADD  CONSTRAINT [FK_Images_Ingredients] FOREIGN KEY([Id])
REFERENCES [dbo].[Ingredients] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Images] NOCHECK CONSTRAINT [FK_Images_Ingredients]
GO
ALTER TABLE [dbo].[ImagesRecipes]  WITH CHECK ADD  CONSTRAINT [FK_ImagesRecipes_Images] FOREIGN KEY([ImageId])
REFERENCES [dbo].[Images] ([Id])
GO
ALTER TABLE [dbo].[ImagesRecipes] CHECK CONSTRAINT [FK_ImagesRecipes_Images]
GO
ALTER TABLE [dbo].[ImagesRecipes]  WITH CHECK ADD  CONSTRAINT [FK_ImagesRecipes_Recipes] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
ALTER TABLE [dbo].[ImagesRecipes] CHECK CONSTRAINT [FK_ImagesRecipes_Recipes]
GO
ALTER TABLE [dbo].[Passwords]  WITH NOCHECK ADD  CONSTRAINT [FK_Passwords_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Passwords] CHECK CONSTRAINT [FK_Passwords_Users]
GO
ALTER TABLE [dbo].[Recipes]  WITH CHECK ADD  CONSTRAINT [FK_Recipes_Users] FOREIGN KEY([CreatorId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Recipes] CHECK CONSTRAINT [FK_Recipes_Users]
GO
ALTER TABLE [dbo].[RecipesCategories]  WITH CHECK ADD  CONSTRAINT [FK_RecipesCategories_Categories] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[RecipesCategories] CHECK CONSTRAINT [FK_RecipesCategories_Categories]
GO
ALTER TABLE [dbo].[RecipesCategories]  WITH CHECK ADD  CONSTRAINT [FK_RecipesCategories_Recipes] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
ALTER TABLE [dbo].[RecipesCategories] CHECK CONSTRAINT [FK_RecipesCategories_Recipes]
GO
ALTER TABLE [dbo].[RecipesIngredients]  WITH CHECK ADD  CONSTRAINT [FK_RecipesIngredients_Ingredients] FOREIGN KEY([IngredientId])
REFERENCES [dbo].[Ingredients] ([Id])
GO
ALTER TABLE [dbo].[RecipesIngredients] CHECK CONSTRAINT [FK_RecipesIngredients_Ingredients]
GO
ALTER TABLE [dbo].[RecipesIngredients]  WITH CHECK ADD  CONSTRAINT [FK_RecipesIngredients_Recipes] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
ALTER TABLE [dbo].[RecipesIngredients] CHECK CONSTRAINT [FK_RecipesIngredients_Recipes]
GO
ALTER TABLE [dbo].[RecipesSteps]  WITH CHECK ADD  CONSTRAINT [FK_RecipesSteps_Recipes] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
ALTER TABLE [dbo].[RecipesSteps] CHECK CONSTRAINT [FK_RecipesSteps_Recipes]
GO
ALTER TABLE [dbo].[RecipesSteps]  WITH CHECK ADD  CONSTRAINT [FK_RecipesSteps_Steps] FOREIGN KEY([StepId])
REFERENCES [dbo].[Steps] ([Id])
GO
ALTER TABLE [dbo].[RecipesSteps] CHECK CONSTRAINT [FK_RecipesSteps_Steps]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Recipes] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Recipes]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Users]
GO
ALTER TABLE [dbo].[Users]  WITH NOCHECK ADD  CONSTRAINT [FK_Users_Images1] FOREIGN KEY([Id])
REFERENCES [dbo].[Images] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Users] NOCHECK CONSTRAINT [FK_Users_Images1]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Roles] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Roles] ([Id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Roles]
GO
ALTER TABLE [dbo].[UsersRecipesRating]  WITH CHECK ADD  CONSTRAINT [FK_UsersRecipesRating_Recipes] FOREIGN KEY([RecipeId])
REFERENCES [dbo].[Recipes] ([Id])
GO
ALTER TABLE [dbo].[UsersRecipesRating] CHECK CONSTRAINT [FK_UsersRecipesRating_Recipes]
GO
ALTER TABLE [dbo].[UsersRecipesRating]  WITH CHECK ADD  CONSTRAINT [FK_UsersRecipesRating_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UsersRecipesRating] CHECK CONSTRAINT [FK_UsersRecipesRating_Users]
GO
/****** Object:  StoredProcedure [dbo].[AddCategoryToRecipe]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddCategoryToRecipe]
	@RecipeId uniqueidentifier,
	@CategoryId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
	Insert into [dbo].[RecipesCategories] (RecipeId,
	 CategoryId)
	 Values (@RecipeId,
	  @CategoryId)
END
GO
/****** Object:  StoredProcedure [dbo].[AddImageToRecipe]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddImageToRecipe]
	@RecipeId uniqueidentifier,
	@ImageId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
	Insert into [dbo].[ImagesRecipes] (RecipeId,
	 ImageId)
	 Values (@RecipeId,
	  @ImageId)
END
GO
/****** Object:  StoredProcedure [dbo].[AddIngredientToRecipe]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddIngredientToRecipe]
	@RecipeId uniqueidentifier,
	@IngredientId uniqueidentifier,
	@Grammes int
AS
BEGIN
	SET NOCOUNT ON;
	Insert into [dbo].[RecipesIngredients] (RecipeId,
	 IngredientId, Grammes)
	 Values (@RecipeId,
	  @IngredientId, @Grammes)
END
GO
/****** Object:  StoredProcedure [dbo].[AddRateToRecipe]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddRateToRecipe]
	@RecipeId uniqueidentifier,
	@UserId uniqueidentifier,
	@Rate int
AS
BEGIN
	SET NOCOUNT ON;
	Insert into [dbo].[UsersRecipesRating] (RecipeId,
	 UserId, Rate)
	 Values (@RecipeId,
	  @UserId, @Rate)
END
GO
/****** Object:  StoredProcedure [dbo].[AddRecipeToCart]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddRecipeToCart]
	@CartId uniqueidentifier,
	@RecipeId uniqueidentifier,
	@PortionsCount int
AS
BEGIN
	SET NOCOUNT ON;
	Insert into [dbo].[CartsRecipes] (RecipeId,
	 CartId,
	 PortionsCount)
	 Values (@RecipeId,
	  @CartId,
	  @PortionsCount)
END
GO
/****** Object:  StoredProcedure [dbo].[AddStepToRecipe]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddStepToRecipe]
	@RecipeId uniqueidentifier,
	@StepId uniqueidentifier,
	@OrderNumber int
AS
BEGIN
	SET NOCOUNT ON;
	Insert into [dbo].[RecipesSteps] (RecipeId,
	 StepId, OrderNumber)
	 Values (@RecipeId,
	  @StepId, @OrderNumber)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateCart]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateCart]
	@UserId uniqueidentifier,
	@Title nvarchar(50),
	@Text nvarchar(100)
AS
BEGIN
	SET NOCOUNT ON;
	Declare @Id uniqueidentifier;
	Declare @CreatedAt datetimeoffset(7);
	Declare @UpdatedAt datetimeoffset(7);

	Set @Id = NEWID();
	Set @CreatedAt = SYSDATETIMEOFFSET();
	Insert into [dbo].[Carts] (Id,
	 Title,
	 [Text],
	 UserId,
	 CreatedAt)
	 Values (@Id,
	  @Title,
	  @Text,
	  @UserId,
	  @CreatedAt)
	  Select * from [dbo].[Carts] Where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[CreateCategory]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateCategory]
	@Title nvarchar(100)
AS
BEGIN
	SET NOCOUNT ON;
	Declare @Id uniqueidentifier;

	Set @Id = NEWID();
	Insert into [dbo].[Categories] (Id,
	 Title)
	 Values (@Id,
	  @Title)
	  Select * from [dbo].[Categories] Where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[CreateImage]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateImage]
	@BinaryData varbinary(MAX),
	@MIMEType nvarchar(50),
	@FileName nvarchar(MAX),
	@Id uniqueidentifier = NULL
AS
BEGIN
	SET NOCOUNT ON;
	IF @Id IS NULL
	BEGIN
	Set @Id = NEWID();
	END
	Insert into [dbo].[Images] (Id,
	 BinaryData,
	 MIMEType,
	 [FileName])
	 Values (@Id,
	 @BinaryData,
	 @MIMEType,
	 @FileName)
	  Select * from [dbo].[Images] Where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[CreateIngredient]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateIngredient]
	@Title nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	Declare @Id uniqueidentifier;

	Set @Id = NEWID();
	Insert into [dbo].[Ingredients] (Id,
	 Title)
	 Values (@Id,
	  @Title)
	  Select * from [dbo].[Ingredients] Where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[CreateRecipe]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateRecipe]
	@CreatorId uniqueidentifier,
	@Title nvarchar(250),
	@Difficulty int,
	@PreparationTime int
AS
BEGIN
	SET NOCOUNT ON;
	Declare @Id uniqueidentifier;
	Declare @CreatedAt datetimeoffset(7);
	Declare @UpdatedAt datetimeoffset(7);

	Set @Id = NEWID();
	Set @CreatedAt = SYSDATETIMEOFFSET();
	Set @UpdatedAt = @CreatedAt;
	Insert into [dbo].[Recipes] (Id,
	 Title,
	 CreatorId,
	 Difficulty,
	 PreparationTime,
	 CreatedAt,
	 UpdatedAt)
	 Values (@Id,
	  @Title,
	  @CreatorId,
	  @Difficulty,
	  @PreparationTime,
	  @CreatedAt,
	  @UpdatedAt)
	  Select * from [dbo].[Recipes] Where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[CreateRole]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateRole]
	@Title nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;
	Declare @Id uniqueidentifier;

	Set @Id = NEWID();
	Insert into [dbo].[Roles] (Id,
	 Title)
	 Values (@Id,
	  @Title)
	  Select * from [dbo].[Roles] Where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[CreateStep]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateStep]
	@Description nvarchar(MAX)
AS
BEGIN
	SET NOCOUNT ON;
	Declare @Id uniqueidentifier;

	Set @Id = NEWID();
	Insert into [dbo].[Steps] (Id,
	 [Description])
	 Values (@Id,
	  @Description)
	  Select * from [dbo].[Steps] Where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateUser]

	@Login nvarchar(50),
	@Email nvarchar(MAX),
	@Password nvarchar(MAX),
	@RoleId uniqueidentifier,
	@Name nvarchar(50) = NULL,
	@Surname nvarchar(50) = NULL,
	@AboutSection nvarchar(MAX) = NULL
AS
BEGIN
	SET NOCOUNT ON;

	Declare @Id uniqueidentifier;
	Declare @CreatedAt datetimeoffset(7);
	
	Set @CreatedAt = SYSDATETIMEOFFSET();
	Set @Id = NEWID();
	Insert into [dbo].[Users] (Id,
	 [Login],
	 Email,
	 RoleId,
	 [Name],
	 [Surname],
	 [AboutSection],
	 [CreatedAt],
	 [UpdatedAt])
	 Values (@Id,
	 @Login,
	 @Email,
	 @RoleId,
	 @Name,
	 @Surname,
	 @AboutSection,
	 @CreatedAt,
	 @CreatedAt)
	 Insert into [dbo].[Passwords] (UserId, [Hash], CreatedAt, UpdatedAt) 
	 Values (@Id, @Password, @CreatedAt, @CreatedAt)
	 Exec [dbo].[GetUserById] @Id
END
GO
/****** Object:  StoredProcedure [dbo].[CreateUserReview]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateUserReview]
	@UserId uniqueidentifier,
	@RecipeId uniqueidentifier,
	@Title nvarchar(50),
	@Text nvarchar(MAX)
AS
BEGIN
	SET NOCOUNT ON;
	Declare @Id uniqueidentifier;
	Declare @CreatedAt datetimeoffset(7);

	Set @Id = NEWID();
	Set @CreatedAt = SYSDATETIMEOFFSET();
	Insert into [dbo].[Reviews] (
	 UserId,
	 RecipeId,
	 Title,
	 [Text],
	 CreatedAt
	 )
	 Values (
	 @UserId,
	 @RecipeId,
	 @Title,
	 @Text,
	 @CreatedAt
	 )
	  Select * from [dbo].[Reviews] Where UserId = @UserId AND RecipeId = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteCategoryById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteCategoryById]
	@CategoryId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

DELETE FROM [dbo].[Categories]
Where Id = @CategoryId
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteImageById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteImageById]
	@ImageId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

DELETE FROM [dbo].[Images]
Where Id = @ImageId
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteIngredientById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteIngredientById]
	@IngredientId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

DELETE FROM [dbo].[Ingredients]
Where Id = @IngredientId
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteRecipeById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteRecipeById]
	@RecipeId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

DELETE FROM [dbo].[Recipes]
Where Id = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[DeleteUserById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DeleteUserById]
	@UserId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

DELETE FROM [dbo].[Users]
Where Id = @UserId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllCartsByUserId]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllCartsByUserId]
	@UserId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT c.[Id], 
c.[Title],
c.[CreatedAt],
(Select count(RecipeId)
   from dbo.[CartsRecipes] as cr where cr.[CartId] = c.[Id]) as RecipesCount
from [dbo].[Carts] as c
Where c.[UserId] = @UserId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllCategories]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllCategories]
AS
BEGIN
	SET NOCOUNT ON;

SELECT [Id], [Title] from [dbo].[Categories]
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllCategoriesByRecipeId]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllCategoriesByRecipeId]
	@RecipeId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
	
SELECT c.[Id], c.[Title] from [dbo].[RecipesCategories] as rc
Join [dbo].[Categories] as c on rc.[CategoryId] = c.Id
Where rc.RecipeId = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllImagesByRecipeId]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllImagesByRecipeId]
	@RecipeId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
	
SELECT i.[Id] from [dbo].[ImagesRecipes] as ir
Join [dbo].[Images] as i on i.[Id] = ir.ImageId
Where ir.RecipeId = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllIngredients]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllIngredients]
AS
BEGIN
	SET NOCOUNT ON;

SELECT [Id], [Title], [Description] from [dbo].[Ingredients]
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRecipeIngredients]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllRecipeIngredients]
	@RecipeId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
	Select i.Id, i.[Description], i.[Title]
	from [dbo].[RecipesIngredients] as ri
	Join [dbo].[Ingredients] as i on i.[Id] = ri.[IngredientId]
	Where ri.RecipeId = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRecipeReviews]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllRecipeReviews]
	@RecipeId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT review.[Title], 
review.[Text], 
review.[CreatedAt],
u.[Login],
u.[Name],
u.[Surname],
i.[BinaryData],
i.[FileName],
i.[MIMEType]
FROM [dbo].[Reviews] as review
JOIN [dbo].[Users] as u on review.UserId = u.[Id]
LEFT JOIN [dbo].[Images] as i on u.[Id] = i.Id

Where review.RecipeId = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRecipes]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAllRecipes]
AS
BEGIN
	SET NOCOUNT ON;

SELECT rec.[Id],
 rec.[Title], 
 rec.[Difficulty],
 rec.[PreparationTime],
 (Select AVG(CAST(urrating.[Rate] as decimal(4, 2)))
 from dbo.[UsersRecipesRating] as urrating where urrating.RecipeId = rec.[Id]) as RecipeRate,
  (Select COUNT(urrating.[UserId])
   from dbo.[UsersRecipesRating] as urrating where urrating.RecipeId = rec.[Id]) as RatesCount,
 u.[Name],
 u.[Surname],
 u.[Login],
 u.[Id] as UserId
  FROM [GetncookDB].[dbo].[Recipes] as rec
Join [GetncookDB].[dbo].[Users] as u on rec.[CreatorId] = u.[Id]
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRecipesByCartId]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAllRecipesByCartId]
	@CartId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT rec.[Id],
cr.[PortionsCount],
 rec.[Title], 
 rec.[Difficulty],
 rec.[PreparationTime],
 (Select AVG(CAST(urrating.[Rate] as decimal(4, 2)))
 from dbo.[UsersRecipesRating] as urrating where urrating.RecipeId = rec.[Id]) as RecipeRate,
  (Select COUNT(urrating.[UserId])
   from dbo.[UsersRecipesRating] as urrating where urrating.RecipeId = rec.[Id]) as RatesCount,
 u.[Name],
 u.[Surname],
 u.[Login],
 u.[Id] as UserId
  FROM [GetncookDB].[dbo].[CartsRecipes] as cr
 Join [dbo].[Recipes] as rec on rec.Id = cr.RecipeId
Join [GetncookDB].[dbo].[Users] as u on rec.[CreatorId] = u.[Id]
Where cr.CartId = @CartId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRecipesByUserId]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAllRecipesByUserId]
	@UserId uniqueIdentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT rec.[Id],
 rec.[Title], 
 rec.[Difficulty],
 rec.[PreparationTime],
 (Select avg(Rate)
 from dbo.[UsersRecipesRating] as urrating where urrating.RecipeId = rec.[Id]) as RecipeRate,
  (Select count(UserId)
   from dbo.[UsersRecipesRating] as urrating where urrating.RecipeId = rec.[Id]) as RatesCount
  FROM [GetncookDB].[dbo].[Recipes] as rec
Where rec.[CreatorId] = @UserId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRecipeSteps]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllRecipeSteps]
	@RecipeId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;
	Select s.Id, s.[Description], rs.[OrderNumber]
	from [dbo].[RecipesSteps] as rs
	Join [dbo].[Steps] as s on s.[Id] = rs.[StepId]
	Where rs.RecipeId = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllRoles]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetAllRoles]
AS
BEGIN
	SET NOCOUNT ON;

SELECT [Id], [Title] from [dbo].[Roles]
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllUsers]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetAllUsers]
AS
BEGIN
	SET NOCOUNT ON;

SELECT u.[Id],
 u.[Name], 
 u.[Surname], 
 u.[Login],
 u.[Email],
 r.[Title] as RoleTitle,
 u.RoleId as RoleId,
 u.[AboutSection], 
 u.[CreatedAt], 
 u.[UpdatedAt]
  FROM [GetncookDB].[dbo].[Users] as u
Join [GetncookDB].[dbo].[Roles] as r on u.[RoleId] = r.[Id]
END
GO
/****** Object:  StoredProcedure [dbo].[GetCartInfoById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetCartInfoById]
	@CartId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT c.[Id], 
c.[Title],
c.[CreatedAt],
(Select count(RecipeId)
   from dbo.[CartsRecipes] as cr where cr.[CartId] = c.[Id]) as RecipesCount,
(Select count(IngredientId)
   from dbo.CartsIngredients as ci where ci.[CartId] = c.[Id]) as IngredientsCount
from [dbo].[Carts] as c
Where c.[Id] = @CartId
END
GO
/****** Object:  StoredProcedure [dbo].[GetCategoryByTitle]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetCategoryByTitle]
	@Title nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;

SELECT [Id],
 [Title]
  FROM [dbo].[Categories]
  Where [Title] = @Title
END
GO
/****** Object:  StoredProcedure [dbo].[GetImageById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetImageById]
	@ImageId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT [BinaryData],
 [MIMEType],
 [FileName]
  FROM [dbo].[Images]
Where [Id] = @ImageId
END
GO
/****** Object:  StoredProcedure [dbo].[GetIngredientById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetIngredientById]
	@IngredientId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT i.[Id],
 i.[Title],
 i.[Description],
 img.[BinaryData],
 img.[MIMEType]
  FROM [dbo].[Ingredients] as i
left Join [dbo].[Images] as img on i.[Id] = img.[Id]
Where i.[Id] = @IngredientId
END
GO
/****** Object:  StoredProcedure [dbo].[GetIngredientsListByCart]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetIngredientsListByCart]
	@CartId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

Select Sum(ri.[Grammes] * cr.[PortionsCount]) as GrammesSum from [dbo].[CartsRecipes] as cr
join [dbo].[RecipesIngredients] as ri on ri.[RecipeId] = cr.RecipeId
join [dbo].[Ingredients] as i on i.[Id] = ri.[IngredientId]
where cr.[CartId] = @CartId
GROUP BY i.[Title], i.[Id]
END
GO
/****** Object:  StoredProcedure [dbo].[GetPasswordById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetPasswordById]
	@UserId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT [Hash]
  FROM [dbo].[Passwords]
Where [UserId] = @UserId
END
GO
/****** Object:  StoredProcedure [dbo].[GetRecipeById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetRecipeById]
	@RecipeId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT rec.[Id],
 rec.[Title], 
 rec.[Difficulty],
 rec.[PreparationTime],
 rec.[CreatedAt],
 (Select cast(avg(Rate) as float)
 from dbo.[UsersRecipesRating] as urrating where urrating.RecipeId = rec.[Id]) as RecipeRate,
  (Select count(UserId)
   from dbo.[UsersRecipesRating] as urrating where urrating.RecipeId = rec.[Id]) as RecipeCount,
 u.[Name],
 u.[Surname],
 u.[Login],
 u.[Id] as UserId
  FROM [GetncookDB].[dbo].[Recipes] as rec
Join [GetncookDB].[dbo].[Users] as u on rec.[CreatorId] = u.[Id]
Where rec.[Id] = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[GetRecipeRateById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetRecipeRateById]
	@UserId uniqueidentifier,
	@RecipeId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT * FROM [dbo].[UsersRecipesRating]
  Where [UserId] = @UserId AND [RecipeId] = @RecipeId
END
GO
/****** Object:  StoredProcedure [dbo].[GetRoleById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetRoleById]
	@Id uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

SELECT [Id],
 [Title]
  FROM [dbo].[Roles]
  Where [Id] = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[GetRoleByTitle]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[GetRoleByTitle]
	@Title nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;

SELECT [Id],
 [Title]
  FROM [dbo].[Roles]
  Where [Title] = @Title
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserByEmail]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetUserByEmail]
	@Email nvarchar(MAX)
AS
BEGIN
	SET NOCOUNT ON;

 Select
 u.[Id],
 u.[Name], 
 u.[Surname], 
 u.[Login],
 u.[Email],
 r.[Title] as RoleTitle,
 u.[RoleId] as RoleId,
 u.[AboutSection],
 i.[FileName] as AvatarName,
 i.[BinaryData] as AvatarData,
 i.[MIMEType] as AvatarMIMEType,
 u.[CreatedAt], 
 u.[UpdatedAt]
	 from [dbo].Users as u
	 Join [dbo].[Roles] as r on u.[RoleId] = r.[Id]
	 left Join [dbo].[Images] as i on u.[Id] = i.[Id]
Where u.[Email] = @Email
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetUserById]
	@UserId uniqueidentifier
AS
BEGIN
	SET NOCOUNT ON;

 Select
 u.[Id],
 u.[Name], 
 u.[Surname], 
 u.[Login],
 u.[Email],
 r.[Title] as RoleTitle,
 u.[RoleId] as RoleId,
 u.[AboutSection],
 i.[FileName] as AvatarName,
 i.[BinaryData] as AvatarData,
 i.[MIMEType] as AvatarMIMEType,
 u.[CreatedAt], 
 u.[UpdatedAt]
	 from [dbo].Users as u
	 Join [dbo].[Roles] as r on u.[RoleId] = r.[Id]
	 left Join [dbo].[Images] as i on u.[Id] = i.[Id]
Where u.[Id] = @UserId
END
GO
/****** Object:  StoredProcedure [dbo].[GetUserByLogin]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[GetUserByLogin]
	@Login nvarchar(50)
AS
BEGIN
	SET NOCOUNT ON;

 Select
 u.[Id],
 u.[Name], 
 u.[Surname], 
 u.[Login],
 u.[Email],
 r.[Title] as RoleTitle,
 u.[RoleId] as RoleId,
 u.[AboutSection],
 i.[FileName] as AvatarName,
 i.[BinaryData] as AvatarData,
 i.[MIMEType] as AvatarMIMEType,
 u.[CreatedAt], 
 u.[UpdatedAt]
	 from [dbo].Users as u
	 Join [dbo].[Roles] as r on u.[RoleId] = r.[Id]
	 left Join [dbo].[Images] as i on u.[Id] = i.[Id]
Where u.[Login] = @Login
END
GO
/****** Object:  StoredProcedure [dbo].[InitialDBSetup]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InitialDBSetup]
AS

BEGIN
	Declare @AdminRoleID uniqueidentifier;
	Declare @AdminID uniqueidentifier;
	Declare @UserRoleID uniqueidentifier;
	Declare @PasswordID uniqueidentifier;
	Declare @HashPassword nvarchar(4000);
	Declare @InitialAdminDate datetimeoffset(7);
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	IF NOT EXISTS(SELECT * FROM [dbo].[Roles] WHERE Title = 'Admin')
	BEGIN
	Set @AdminRoleID = NEWID();
	Insert Into [dbo].[Roles](Id, Title) Values(@AdminRoleID, 'Admin')
	END

	If not exists(Select * from [dbo].[Users] where [Name] = 'Admin')
	Begin
	Set @AdminID = NEWID();
	Set @InitialAdminDate = SYSDATETIMEOFFSET();

	Insert Into [dbo].[Users]
	(Id, [Name], [Surname], [Email], [Login], [AboutSection], [RoleId], [CreatedAt], [UpdatedAt])
	Values (@AdminID, 'Admin', 'Admin', 'admin@admin.com', 'admin', 'Its admin', @AdminRoleID, @InitialAdminDate, @InitialAdminDate)
	End
	IF NOT EXISTS(SELECT * FROM [dbo].[Roles] WHERE Title = 'User')
	BEGIN
	Insert Into [dbo].[Roles](Id, Title) Values(NEWID(), 'User')
	END
END
GO
/****** Object:  StoredProcedure [dbo].[SetPassword]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SetPassword]
	@UserId uniqueidentifier,
	@Password nvarchar(MAX)
AS
BEGIN
	SET NOCOUNT ON;

	Declare @CreatedAt datetimeoffset(7);	
	Set @CreatedAt = SYSDATETIMEOFFSET();

	 Insert into [dbo].[Passwords] (UserId, [Hash], CreatedAt, UpdatedAt) 
	 Values (@UserId, @Password, @CreatedAt, @CreatedAt)
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateCategoryById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCategoryById]
	@CategoryId uniqueidentifier,
	@Title nvarchar(100)
AS
BEGIN
	SET NOCOUNT ON;

UPDATE [dbo].[Categories]
SET Title = @Title
WHERE Id = @CategoryId

SELECT Id, Title FROM [dbo].[Categories]
WHERE Id = @CategoryId

END
GO
/****** Object:  StoredProcedure [dbo].[UpdateImageById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateImageById]
	@ImageId uniqueidentifier,
	@BinaryData varbinary(MAX),
	@MIMEType nvarchar(50),
	@FileName nvarchar(MAX) = NULL
AS
BEGIN
	SET NOCOUNT ON;
	Update [dbo].[Images]
	Set BinaryData = @BinaryData, MIMEType = @MIMEType, [FileName] = @FileName
	Where Id = @ImageId
	 
	Select * from [dbo].[Images] Where Id = @ImageId
END
GO
/****** Object:  StoredProcedure [dbo].[UpdatePassword]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdatePassword]
	@UserId uniqueidentifier,
	@Password nvarchar(MAX)
AS
BEGIN
	SET NOCOUNT ON;

Update [dbo].[Passwords]
Set [Hash] = @Password,
[UpdatedAt] = SYSDATETIMEOFFSET()
Where [UserId] = @UserId
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateRecipeById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateRecipeById]
	@Id uniqueidentifier,
	@Title nvarchar(250),
	@Difficulty int,
	@PreparationTime int
AS
BEGIN
	SET NOCOUNT ON;
	Update [dbo].[Recipes]
	Set Title = @Title, Difficulty = @Difficulty, PreparationTime = @PreparationTime, UpdatedAt = SYSDATETIMEOFFSET()
	Where Id = @Id
	 
	Select * from [dbo].[Recipes] Where Id = @Id
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateUserById]    Script Date: 1/11/2019 8:59:52 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[UpdateUserById]
	@Id uniqueidentifier,
	@RoleId uniqueidentifier,
	@Name nvarchar(50) = NULL,
	@Surname nvarchar(50) = NULL
AS
BEGIN
	SET NOCOUNT ON;

Update [dbo].[Users]
Set [RoleId] = @RoleId, 
[Name] = @Name, 
[Surname] = @Surname, 
[UpdatedAt] = SYSDATETIMEOFFSET()
Where [Id] = @Id

Exec [dbo].[GetUserById] @UserId = @Id
END
GO
USE [master]
GO
ALTER DATABASE [GetncookDB] SET  READ_WRITE 
GO
