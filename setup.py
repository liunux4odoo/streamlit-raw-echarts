import setuptools
from pathlib import Path


def readme():
    return Path(__file__).parent.absolute().joinpath('README.md').read_text()


setuptools.setup(
    name='streamlit-raw-echarts',
    version='0.1.3',
    author='liunux',
    author_email='liunux@qq.com',
    description='Echarts component for streamlit supporting raw Echarts api.',
    long_description=readme(),
    long_description_content_type='text/markdown',
    url='https://github.com/liunux4odoo/streamlit-raw-echarts',
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires='>=3.6',
    install_requires=[
                'streamlit >= 0.63',
                'simplejson >= 3.00',
    ]
)
