import argparse
import os
import glob
import subprocess

class GithubAction:
    def get_cli_args(self):
        parser = argparse.ArgumentParser()
        parser.add_argument('-repo', required=True)
        parser.add_argument('-access_token', required=True)
        parser.add_argument('-commit_author', required=True)
        parser.add_argument('-commit_user_email', required=True)
        parser.add_argument('-commit_message', required=True)
        parser.add_argument('-branch', required=True)
        parser.add_argument('-output_file_paths', required=True)
        parser.add_argument('-categories', required=True)
        cli_args = parser.parse_args()
        self.repo = cli_args.repo
        self.access_token = cli_args.access_token
        self.commit_author = cli_args.commit_author
        self.commit_user_email = cli_args.commit_user_email
        self.commit_message = cli_args.commit_message
        self.branch = self.get_branch_name(cli_args.branch)
        self.output_file_paths = cli_args.output_file_paths
        self.categories = cli_args.categories

    def get_branch_name(self, branch):
        if "refs/heads/" in branch or "refs/pull" in branch:
            return os.environ['GITHUB_REF_NAME']
        else:
            return branch

    def get_output_file_paths(self):
        file_paths = self.output_file_paths
        file_paths = file_paths.translate({ord(i):None for i in '[]" '})
        file_paths = file_paths.split(",")
        updated_file_paths = []
        for file_path in file_paths:
            updated_file_paths += glob.glob(file_path)
        updated_file_paths = [updated_file_path for updated_file_path in updated_file_paths if ".md" in updated_file_path]   
        updated_file_paths = ' '.join(updated_file_paths)
        self.output_file_paths = updated_file_paths

    def get_categories(self):
        categories = self.categories
        categories = categories.translate({ord(i):None for i in '[]" '})
        categories = categories.split(",")
        categories = ' '.join(categories)
        self.categories = categories

    def start_markdown_autodocs(self):
        self.get_cli_args()
        self.get_output_file_paths()
        self.get_categories()
        markdown_autodocs_version = subprocess.getoutput("npm show markdown-autodocs version")
        docker_image = "dineshsonachalam/markdown-autodocs"
        options = f"--outputFilePath {self.output_file_paths} --category {self.categories} --repo {self.repo} --branch {self.branch} --accessToken {self.access_token}"
        os.system(f"docker pull {docker_image}:{markdown_autodocs_version}")
        os.system(f"docker run -v $(pwd):/usr/src/app {docker_image}:{markdown_autodocs_version} {options}")
        
    def autodocument_markdown_files(self):
        self.start_markdown_autodocs()
        os.system(f"git config user.name '{self.commit_author}'")
        print(f"git config user.name '{self.commit_author}'")

        os.system(f"git config user.email '{self.commit_user_email}'")
        print(f"git config user.email '{self.commit_user_email}'")

        os.system(f"git add {self.output_file_paths}")
        print(f"git add {self.output_file_paths}")

        os.system(f"git commit -m '{self.commit_message}' {self.output_file_paths}")
        print(f"git commit -m '{self.commit_message}' {self.output_file_paths}")
        
        os.system(f"git push origin {self.branch}")
        print(f"git push origin {self.branch}")

if __name__ == "__main__":
    gh_action = GithubAction()
    gh_action.autodocument_markdown_files()
